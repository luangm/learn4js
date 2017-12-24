import Shape from "./Shape";
import Executor from "./executor/Executor";
import AddOp from "./op/pairwise/AddOp";
import MatMulOp from "./op/special/MatMulOp";
import SubtractOp from "./op/pairwise/SubtractOp";
import SumOp from "./op/reduction/SumOp";

/**
 * A Tensor is the basic data storage for N-Dimensional array.
 * The tensor is implemented with ArrayBuffer as storage.
 * The data is assumed to be float32 type
 */
export default class Tensor {

  constructor(data, shape) {
    if (arguments.length === 1) {
      this._shape = new Shape(data);
      this._data = new Float64Array(this._shape.length);
    } else {
      this._shape = new Shape(shape);
      this._data = new Float64Array(data);
    }
  }

  get data() {
    return this._data;
  }

  get isMatrix() {
    return this.rank === 2 && this.shape[0] !== 1 && this.shape[1] !== 1;
  }

  get length() {
    return this._shape.length;
  }

  get rank() {
    return this._shape.rank;
  }

  get shape() {
    return this._shape.shape;
  }

  get strides() {
    return this._shape.strides;
  }

  /**
   * Perform add operation, and returns a new tensor.
   */
  add(other) {
    // TODO: Dimension Checks
    let result = new Tensor(this.shape);
    Executor.instance.exec(new AddOp(this, other, result));
    return result;
  }

  subtract(other) {
    // TODO: Dimension Checks
    let result = new Tensor(this.shape);
    Executor.instance.exec(new SubtractOp(this, other, result));
    return result;
  }

  sum() {
    let result = new Tensor([1,1]);
    Executor.instance.exec(new SumOp(this, null, result));
    return result;
  }

  /**
   * Add inplace. returns self
   */
  addi(other) {
    // TODO: Dimension Checks
    Executor.instance.exec(new AddOp(this, other, this));
    return this;
  }

  get(indices) {
    let offset = this._shape.getOffset(indices);
    return this._data[offset];
  }

  mmul(other) {
    // TODO: Checks
    let result = new Tensor([this.shape[0], other.shape[1]]);
    Executor.instance.exec(new MatMulOp(this, other, result));
    return result;
  }

  set(indices, value) {
    let offset = this._shape.getOffset(indices);
    this._data[offset] = value;
  }
}