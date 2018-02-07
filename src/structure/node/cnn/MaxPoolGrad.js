import Expression from "../Expression";

export default class MaxPoolGrad extends Expression {

  constructor({name, image, kernelShape, grad}) {
    super(name);
    this._image = image;
    this._kernelShape = kernelShape;
    this._grad = grad;
  }

  get grad() {
    return this._grad;
  }

  get image() {
    return this._image;
  }

  get kernelShape() {
    return this._kernelShape;
  }

  get shape() {
    return this._image.shape;
  }

  accept(visitor, params) {
    visitor.visitMaxPoolGrad(this, params);
  }

}