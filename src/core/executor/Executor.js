import TensorUtils from "../util/TensorUtils";
import SpecialOp from "../op/special/SpecialOp";
import ReductionOp from "../op/reduction/ReductionOp";
import Tensor from "../Tensor";
import IndexOp from "../op/index/IndexOp";

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
    if (op instanceof ReductionOp) {
      this._accum(op, 0, dim, new Array(op.input.rank))
    }
    if (op instanceof IndexOp) {
      this._indexAccum(op, 0, dim, new Array(op.input.rank))
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
   * Starts the execution from a certain dimension
   */
  _execAtDim(op, dim, indices) {
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
}