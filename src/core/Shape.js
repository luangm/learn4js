import TensorUtils from "./util/TensorUtils";

/**
 * Shape encapsulates shape information
 */
export default class Shape {

  constructor(shape) {
    this._shape = shape;
    this._strides = TensorUtils.getStrides(shape);
    this._length = TensorUtils.getLength(shape);
  }

  get length() {
    return this._length;
  }

  get rank() {
    return this._shape.length;
  }

  get shape() {
    return this._shape;
  }

  get strides() {
    return this._strides;
  }

  getOffset(indices) {
    let rank = this._shape.length;
    if (rank !== indices.length) {
      throw new Error('Indices must be the same length as rank of the tensor');
    }

    return TensorUtils.computeOffset(indices, this._shape, this._strides);
  }

  getSize(index) {
    return this._shape[index];
  }

  toString() {
    return this._shape;
  }
}