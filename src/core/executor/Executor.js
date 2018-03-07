import IndexOp from "../op/index/IndexOp";
import PairwiseOp from "../op/pairwise/PairwiseOp";
import ReductionOp from "../op/reduction/ReductionOp";
import SpecialOp from "../op/special/SpecialOp";
import IndexSetOp from "../op/transform/IndexSetOp";
import TransformOp from "../op/transform/TransformOp";
import Tensor from "../Tensor";
import ShapeUtils from "../util/ShapeUtils";
import TensorUtils from "../util/TensorUtils";

const singleton = Symbol();

/**
 * Executor class is used to execute Ops
 *
 * The executor implementation may be changed to use multiple threads / workers
 *
 * An parallel optimization for execution could be split the inputs into multiple sub tensors and let worker run on each.
 */
export default class Executor {

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Executor();
    }

    return this[singleton];
  }

  /**
   * Runs an op. Does NOT return.
   * The caller is expected to grab result from op.result
   *
   * This function loops through the Tensor with consideration of buffer index
   */
  exec(op) {

    if (op instanceof PairwiseOp) {
      this._execPairwise(op);
      return;
    }

    if (op instanceof TransformOp) {
      this._execTransform(op);
      return;
    }

    if (op.isSpecial) {
      op.exec();
      return;
    }


    if (op instanceof SpecialOp) {
      // Special Ops bypasses executor
      op.exec();
    } else if (op instanceof ReductionOp) {
      let accum = this._accumAtDim(op, 0);
      op.result.data[0] = op.getResult(accum);
    } else {
      this._execAtDim(op, 0);
    }
  }

  execAtDim(op, dim) {
    if (op.isSpecial) {
      op.exec(dim);
      return;
    }

    if (op instanceof ReductionOp) {
      this._accum(op, 0, dim, new Array(op.input.rank));
    }

    if (op instanceof IndexOp) {
      this._indexAccum(op, 0, dim, new Array(op.input.rank));
    }

    if (op instanceof IndexSetOp) {
      this._set(op, 0, dim, new Array(op.input.rank));
    }
  }

  _accum(op, currentDim, targetDim, indices) {
    let input = op.input;
    let result = op.result;

    if (currentDim === input.rank) {
      let accum = 0;
      for (let i = 0; i < input.shape[targetDim]; i++) {
        indices[targetDim] = i;
        let offset = TensorUtils.computeOffset(indices, input.shape, input.strides);
        let val = input.data[offset];
        accum = op.update(accum, val);
      }

      indices[targetDim] = 0;
      let offset = TensorUtils.computeOffset(indices, result.shape, result.strides);
      result.data[offset] = accum;
      return;
    }

    // When encounter the target dim, set the result indices[dim] = 0
    if (currentDim === targetDim) {
      indices[currentDim] = 0;
      this._accum(op, currentDim + 1, targetDim, indices);
    } else {
      for (let i = 0; i < input.shape[currentDim]; i++) {
        indices[currentDim] = i;
        this._accum(op, currentDim + 1, targetDim, indices);
      }
    }
  }

  /**
   * Starts the execution from a certain dimension
   */
  _accumAtDim(op, dim, indices) {
    let rank = op.input.rank;
    if (dim >= rank) {
      return;
    }

    let shape = op.input.shape;
    let strides = op.input.strides;

    if (!indices) {
      indices = [];
      for (let i = 0; i < rank; i++) {
        indices.push(0);
      }
    }

    let accum = 0;

    for (let i = 0; i < shape[dim]; i++) {
      indices[dim] = i;
      if (dim === rank - 1) {
        let offset = TensorUtils.computeOffset(indices, shape, strides);
        let a = op.input.data[offset];
        accum = op.update(accum, a);
      } else {
        let subResult = this._accumAtDim(op, dim + 1, indices);
        accum += subResult;
      }
    }

    return accum;
  }

  /**
   * Executes an accumulation with a 2D input
   * @param op {Operation}
   * @param accumDims {boolean[]}
   * @private
   */
  _execAccum2D(op, accumDims) {
    let input = op.input.data;
    let result = op.result.data;

    let inputStrides = op.input.strides;
    let resultStrides = op.result.strides;

    let shape = op.input.shape; // accumulate around input, not the result

    for (let i = 0; i < shape[0]; i++) {
      for (let j = 0; j < shape[1]; j++) {
        let inputPointer = i * inputStrides[0] + j * inputStrides[1];

        let resultPointer = accumDims[0] ? 0 : i * resultStrides[0];
        resultPointer += accumDims[1] ? 0 : j * resultStrides[1];

        result[resultPointer] = op.update(result[resultPointer], input[inputPointer]);

        // console.log(inputPointer, resultPointer);
      }
    }
  }

  /**
   * Starts the execution from a certain dimension
   */
  _execAtDim(op, dim, indices) {

    // console.log("***", indices);

    let rank = op.result.rank;
    if (dim >= rank) {
      return;
    }

    let shape = op.input.shape;
    let strides = op.input.strides;

    if (!indices) {
      indices = [];
      for (let i = 0; i < rank; i++) {
        indices.push(0);
      }
    }

    for (let i = 0; i < shape[dim]; i++) {
      indices[dim] = i;
      if (dim === rank - 1) {
        // console.log(indices);
        let offset = TensorUtils.computeOffset(indices, shape, strides);
        let a = op.input.data[offset];
        let b = null;
        if (op.other) {
          if (op.other instanceof Tensor) {
            b = op.other.data[offset];
          } else {
            b = op.other; // TODO: hack, should do broadcast here
          }
        }
        op.result.data[offset] = op.body(a, b, offset);
      }

      this._execAtDim(op, dim + 1, indices);
    }
  }

  _execPairwise(op) {
    let shape = op.result.shape;
    if (shape.length === 2) {
      this._execPairwise2D(op);
    } else {
      this._execPairwiseGeneral(op);
    }
  }

  _execPairwise2D(op) {
    let input = op.input.data;
    let other = op.other.data;
    let result = op.result.data;

    let inputStrides = op.input.strides;
    let otherStrides = op.other.strides;
    let resultStrides = op.result.strides;

    let inputShape = op.input.shape;
    let otherShape = op.other.shape;
    let shape = op.result.shape;

    let inputBroadDims = ShapeUtils.getBroadcastedDimensions(inputShape, shape);
    let otherBroadDims = ShapeUtils.getBroadcastedDimensions(otherShape, shape);

    let inputS0 = (inputBroadDims[0] ? 0 : inputStrides[0]) | 0;
    let inputS1 = (inputBroadDims[1] ? 0 : inputStrides[1]) | 0;
    let otherS0 = (otherBroadDims[0] ? 0 : otherStrides[0]) | 0;
    let otherS1 = (otherBroadDims[1] ? 0 : otherStrides[1]) | 0;
    let resultS0 = resultStrides[0] | 0;
    let resultS1 = resultStrides[1] | 0;
    let s0 = shape[0] | 0;
    let s1 = shape[1] | 0;

    let iPtr = 0 | 0;
    let oPtr = 0 | 0;
    let rPtr = 0 | 0;

    let inputD0 = (inputS0 - inputS1 * s1) | 0;
    let otherD0 = (otherS0 - otherS1 * s1) | 0;
    let resultD0 = (resultS0 - resultS1 * s1) | 0;

    for (let i = 0; i < s0; i++) {

      for (let j = 0; j < s1; j++) {
        result[rPtr] = op.body(input[iPtr], other[oPtr]);
        iPtr = (iPtr + inputS1) | 0;
        oPtr = (oPtr + otherS1) | 0;
        rPtr = (rPtr + resultS1) | 0;
        // result[(rPtr + resultS1) | 0] = op.body(input[(iPtr + inputS1) | 0], other[(oPtr + otherS1) | 0]);
        // result[(rPtr + resultS1 * 2) | 0] = op.body(input[(iPtr + inputS1 * 2) | 0], other[(oPtr + otherS1 * 2) | 0]);
        // result[(rPtr + resultS1 * 3) | 0] = op.body(input[(iPtr + inputS1 * 3) | 0], other[(oPtr + otherS1 * 3) | 0]);

        // iPtr = (iPtr + inputS1 * 4) | 0;
        // oPtr = (oPtr + otherS1 * 4) | 0;
        // rPtr = (rPtr + resultS1 * 4) | 0;
      }

      iPtr = (iPtr + inputD0) | 0;
      oPtr = (oPtr + otherD0) | 0;
      rPtr = (rPtr + resultD0) | 0;
    }
  }

  /**
   * Generalized pairwise ops.
   * @param op {PairwiseOp}
   * @private
   */
  _execPairwiseGeneral(op) {
    let input = op.input.data;
    let other = op.other.data;
    let result = op.result.data;

    let inputStrides = op.input.strides;
    let otherStrides = op.other.strides;
    let resultStrides = op.result.strides;

    let inputShape = op.input.shape;
    let otherShape = op.other.shape;
    let shape = op.result.shape;

    let inputBroadDims = ShapeUtils.getBroadcastedDimensions(inputShape, shape);
    let otherBroadDims = ShapeUtils.getBroadcastedDimensions(otherShape, shape);

    let inputPointer = 0;
    let otherPointer = 0;
    let resultPointer = 0;

    let rank = shape.length;
    let slots = new Array(rank).fill(0);

    let iS = new Array(rank).fill(0);
    let oS = new Array(rank).fill(0);
    let rS = new Array(rank).fill(0);
    for (let i = 0; i < rank; i++) {
      iS[i] = inputBroadDims[i] ? 0 : inputStrides[i];
      oS[i] = otherBroadDims[i] ? 0 : otherStrides[i];
      rS[i] = resultStrides[i];
    }

    let r = rank - 1 | 0;
    while (r >= 0) {

      // console.log(r, inputPointer, otherPointer, resultPointer);

      // Calc
      result[resultPointer] = op.body(input[inputPointer], other[otherPointer]);

      for (r = rank - 1; r >= 0; r--) {
        slots[r]++;

        if (!inputBroadDims[r]) {
          inputPointer += inputStrides[r];
        }

        if (!otherBroadDims[r]) {
          otherPointer += otherStrides[r];
        }

        resultPointer += resultStrides[r];

        if (slots[r] < shape[r]) {
          break;
        }

        slots[r] = 0;

        if (!inputBroadDims[r]) {
          inputPointer -= inputStrides[r] * shape[r];
        }

        if (!otherBroadDims[r]) {
          otherPointer -= otherStrides[r] * shape[r];
        }

        resultPointer -= resultStrides[r] * shape[r];
      }

      // // Overflown
      // if (r < 0) {
      //   break;
      // }
    }
  }

  _execTransform(op) {
    let shape = op.result.shape;
    if (shape.length === 2) {
      this._execTransform2D(op);
    } else {
      this._execTransformGeneral(op);
    }
  }

  _execTransform2D(op) {
    let input = op.input.data;
    let result = op.result.data;

    let inputStrides = op.input.strides;
    let resultStrides = op.result.strides;

    let shape = op.result.shape;

    for (let i = 0; i < shape[0]; i++) {
      for (let j = 0; j < shape[1]; j++) {
        let inputPointer = i * inputStrides[0] + j * inputStrides[1];
        let resultPointer = i * resultStrides[0] + j * resultStrides[1];

        result[resultPointer] = op.body(input[inputPointer]);
      }
    }
  }

  _execTransformGeneral(op) {
    let input = op.input.data;
    let result = op.result.data;

    let inputStrides = op.input.strides;
    let resultStrides = op.result.strides;

    let shape = op.result.shape;

    let inputPointer = 0;
    let resultPointer = 0;

    let rank = shape.length;
    let slots = new Array(rank).fill(0);

    while (true) {

      // Calc
      result[resultPointer] = op.body(input[inputPointer]);

      let r = rank - 1;
      for (; r >= 0; r--) {
        slots[r]++;
        inputPointer += inputStrides[r];
        resultPointer += resultStrides[r];

        if (slots[r] < shape[r]) {
          break;
        }

        slots[r] = 0;
        inputPointer -= inputStrides[r] * shape[r];
        resultPointer -= resultStrides[r] * shape[r];
      }

      // Overflown
      if (r < 0) {
        break;
      }
    }
  }

  _indexAccum(op, currentDim, targetDim, indices) {
    let input = op.input;
    let result = op.result;

    if (currentDim === input.rank) {
      let accum = 0;
      let accumIndex = -1;
      for (let i = 0; i < input.shape[targetDim]; i++) {
        indices[targetDim] = i;
        let offset = TensorUtils.computeOffset(indices, input.shape, input.strides);
        let val = input.data[offset];
        let update = op.update(accum, val, accumIndex, i);
        accum = update[0];
        accumIndex = update[1];
      }

      indices[targetDim] = 0;
      let offset = TensorUtils.computeOffset(indices, result.shape, result.strides);
      result.data[offset] = accumIndex;
      return;
    }

    // When encounter the target dim, set the result indices[dim] = 0
    if (currentDim === targetDim) {
      indices[currentDim] = 0;
      this._indexAccum(op, currentDim + 1, targetDim, indices);
    } else {
      for (let i = 0; i < input.shape[currentDim]; i++) {
        indices[currentDim] = i;
        this._indexAccum(op, currentDim + 1, targetDim, indices);
      }
    }
  }

  _set(op, currentDim, targetDim, indices) {
    let input = op.input;
    let args = op.other;
    let result = op.result;

    for (let i = 0; i < input.length; i++) {
      indices[targetDim] = args.get([i]);
      indices[1] = i;
      let val = input.data[i];
      result.set(indices, val);
    }
  }
}