import Expression from "../Expression";

export default class Im2Col extends Expression {

  constructor({name, image, kernel}) {
    super(name);
    this._image = image;
    this._kernel = kernel;
  }

  get image() {
    return this._image;
  }

  get kernel() {
    return this._kernel;
  }

  accept(visitor, params) {
    visitor.visitIm2Col(this, params);
  }

}