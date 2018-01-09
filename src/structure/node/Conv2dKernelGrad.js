import Expression from "../Expression";

export default class Conv2dKernelGrad extends Expression {

  constructor({name, image, kernel, grad}) {
    super(name);
    this._image = image;
    this._kernel = kernel;
    this._grad = grad;
  }

  get grad() {
    return this._grad;
  }

  get image() {
    return this._image;
  }

  get kernel() {
    return this._kernel;
  }

  get shape() {
    return this._kernel.shape;
  }

  accept(visitor, params) {
    visitor.visitConv2dKernelGrad(this, params);
  }

}