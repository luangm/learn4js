import Shape from "./Shape";
import TensorMath from "./TensorMath";
import ArrayUtils from "./util/ArrayUtils";
import TensorFactory from "./util/TensorFactory";
import TensorFormatter from "./util/TensorFormatter";
import TensorUtils from "./util/TensorUtils";

/**
 * A Tensor is the basic data storage for N-Dimensional array.
 * The tensor is implemented with ArrayBuffer as storage.
 * The data is assumed to be float32 type
 * The tensor stored is assumed to be continuous, no jagged array.
 */
export default class Tensor {

  constructor({data, shape, offset = 0}) {
    this._offset = offset;

    if (shape instanceof Shape) {
      this._shape = shape;
    } else {
      this._shape = new Shape({shape});
    }

    if (data instanceof Float32Array) {
      this._data = data;
    } else if (Array.isArray(data)) {
      this._data = new Float32Array(data);
    } else {
      this._data = new Float32Array(this._shape.length);
    }
  }

  get data() {
    return this._data;
  }

  get isMatrix() {
    return this.rank === 2;
  }

  get isScalar() {
    return this.rank === 0;
  }

  get isVector() {
    return this.rank === 1;
  }

  get length() {
    return this._shape.length;
  }

  get offset() {
    return this._offset;
  }

  get rank() {
    return this._shape.rank;
  }

  get shape() {
    return this._shape.shape;
  }

  get slices() {
    return this.shape[0];
  }

  get strides() {
    return this._shape.strides;
  }

  static create(array) {
    if (array instanceof Tensor) {
      return array;
    }
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
    return TensorMath.addi(this, other);
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

  get(indices = []) {
    let offset = this._shape.getOffset(indices) + this.offset;
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

  slice(num) {
    let offset = this.offset;
    let newShape = [];
    let newStrides = [];

    offset += num * this.strides[0];

    for (let i = 1; i < this.rank; i++) {
      newShape.push(this.shape[i]);
      newStrides.push(this.strides[i]);
    }

    let shape = new Shape({shape: newShape, strides: newStrides, order: this._shape.order});
    let tensor = new Tensor({data: this._data, shape, offset});
    return tensor;
  }

  subtract(other) {
    return TensorMath.subtract(this, other);
  }

  // sum() {
  //   let result = new Tensor({shape: [1, 1]});
  //   Executor.instance.exec(new SumOp(this, null, result));
  //   return result;
  // }

  toString() {
    return new TensorFormatter().format(this);
  }

  transpose(newAxis) {

    let rank = this.rank;

    if (newAxis) {
      if (!Array.isArray(newAxis)) {
        throw new Error('Must specify an array');
      }
      if (newAxis.length !== rank) {
        throw new Error('new Axis must be of the same size as shape');
      }
    }


    let axis = newAxis || ArrayUtils.range(rank).reverse();
    let newStrides = new Array(this.rank);
    let newShape = new Array(this.rank);

    for (let i = 0; i < this.rank; i++) {
      newStrides[i] = this._shape.strides[axis[i]];
      newShape[i] = this._shape.shape[axis[i]];
    }

    // let newStrides = this._shape.strides.slice().reverse();
    // let newShape = this._shape.shape.slice().reverse();
    // let newOrder = ShapeUtils.inferOrder(newShape, newStrides);

    // console.log(newStrides, newShape, newOrder);

    let shape = new Shape({shape: newShape, strides: newStrides, order: this._shape.order});
    return new Tensor({data: this._data, shape: shape, offset: this.offset});
  }
}