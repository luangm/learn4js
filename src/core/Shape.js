import TensorUtils from "./util/TensorUtils";
import ShapeUtils from "./util/ShapeUtils";

/**
 * Shape encapsulates shape information
 */
export default class Shape {

  constructor({shape, strides, order = 'c'}) {
    this._shape = shape;
    this._strides = strides || ShapeUtils.getStrides(shape);
    this._length = ShapeUtils.getLength(shape);
    this._order = order;
  }

  get length() {
    return this._length;
  }

  get order() {
    return this._order;
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


  getOffset(indices = []) {
    if (this.rank !== indices.length) {
      throw new Error('Indices must be the same length as rank of the tensor');
    }

    return TensorUtils.computeOffset(indices, this.shape, this.strides);
  }

  getSize(index) {
    return this.shape[index];
  }

  toString() {
    return this._shape;
  }
}