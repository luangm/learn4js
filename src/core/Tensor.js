import Shape from "./Shape";
import Executor from "./executor/Executor";
import AddOp from "./op/pairwise/AddOp";
import SumOp from "./op/reduction/SumOp";
import TensorMath from "./util/TensorMath";
import TensorUtils from "./util/TensorUtils";
import TensorFactory from "./util/TensorFactory";

/**
 * A Tensor is the basic data storage for N-Dimensional array.
 * The tensor is implemented with ArrayBuffer as storage.
 * The data is assumed to be float32 type
 * The tensor stored is assumed to be continuous, no jagged array.
 */
export default class Tensor {

  constructor({data, shape}) {
    if (data instanceof Float64Array && shape instanceof Shape) {
      this._data = data;
      this._shape = shape;
    } else {
      if (data) {
        this._data = new Float64Array(data);
        this._shape = new Shape(shape);
      } else {
        this._shape = new Shape(shape);
        this._data = new Float64Array(this._shape.length);
      }
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

  static create(array) {
    return TensorFactory.create(array);
  }

  static linspace(from, to, num) {
    return TensorFactory.linspace(from, to, num);
  }

  static ones(shape) {
    return TensorFactory.ones(shape);
  }

  static rand(shape) {
    return TensorFactory.rand(shape);
  }

  static scalar(scalar) {
    return TensorFactory.scalar(scalar);
  }

  static zeros(shape) {
    return TensorFactory.zeros(shape);
  }

  add(other) {
    return TensorMath.add(this, other);
  }

  addi(other) {
    // TODO: Dimension Checks
    Executor.instance.exec(new AddOp(this, other, this));
    return this;
  }

  broadcast(shape) {
    return TensorUtils.broadcastTensor(this, shape);
  }

  divide(other) {
    return TensorMath.divide(this, other);
  }

  fill(scalar) {
    return TensorMath.set(this, scalar);
  }

  get(indices) {
    let offset = this._shape.getOffset(indices);
    return this._data[offset];
  }

  matmul(other) {
    return TensorMath.matmul(this, other);
  }

  multiply(other) {
    return TensorMath.multiply(this, other);
  }

  reshape(shape) {
    return TensorUtils.reshape(this, shape);
  }

  set(indices, value) {
    let offset = this._shape.getOffset(indices);
    this._data[offset] = value;
  }

  subtract(other) {
    return TensorMath.subtract(this, other);
  }

  sum() {
    let result = new Tensor({shape: [1, 1]});
    Executor.instance.exec(new SumOp(this, null, result));
    return result;
  }
}