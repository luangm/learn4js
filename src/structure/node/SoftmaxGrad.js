import UnaryExpression from "./UnaryExpression";

export default class SoftmaxGrad extends UnaryExpression {

  constructor({name, base, grad}) {
    super({name, base});
    this._grad = grad;
  }

  get grad() {
    return this._grad;
  }

  get shape() {
    return this.base.shape;
  }

  accept(visitor, params) {
    visitor.visitSoftmaxGrad(this, params);
  }

}