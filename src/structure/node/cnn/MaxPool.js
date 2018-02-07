import Expression from "../../Expression";
import TensorUtils from "../../../core/util/TensorUtils";

export default class MaxPool extends Expression {

  constructor({name, image, kernelShape}) {
    super(name);
    this._image = image;
    this._kernelShape = kernelShape;
    this._shape = TensorUtils.computeMaxPoolShape(image.shape, kernelShape, 2, 2);
  }

  get image() {
    return this._image;
  }

  get kernelShape() {
    return this._kernelShape;
  }

  get shape() {
    return this._shape;
  }

  accept(visitor, params) {
    visitor.visitMaxPool(this, params);
  }

}