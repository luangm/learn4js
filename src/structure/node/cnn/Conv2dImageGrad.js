import Expression from "../../Expression";

export default class Conv2dImageGrad extends Expression {

  constructor(image, kernel, grad, {name, scope} = {}) {
    super({name, scope});
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
    return this._image.shape;
  }

  get type() {
    return 'Conv2dImageGrad';
  }

  accept(visitor, params) {
    visitor.visitConv2dImageGrad(this, params);
  }

}