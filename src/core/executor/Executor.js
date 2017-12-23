/**
 * Executor class is used to execute Ops
 *
 * The executor implementation may be changed to use multiple threads / workers
 *
 * An parallel optimization for execution could be split the inputs into multiple sub tensors and let worker run on each.
 */
import TensorUtils from "../util/TensorUtils";
import SpecialOp from "../op/special/SpecialOp";

const singleton = Symbol();

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
    } else {
      this.execAtDim(op, 0);
    }
  }

  /**
   * Starts the execution from a certain dimension
   */
  execAtDim(op, dim, indices) {
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

    for (let i = 0; i < shape[dim]; i++) {
      indices[dim] = i;
      if (dim === rank - 1) {
        // console.log(indices);
        let offset = TensorUtils.computeOffset(indices, shape, strides);
        let a = op.input._data[offset];
        let b = op.other._data[offset];
        op.result._data[offset] = op.body(a, b);
      }

      this.execAtDim(op, dim + 1, indices);
    }
  }

}