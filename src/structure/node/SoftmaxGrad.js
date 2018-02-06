import UnaryExpression from "./UnaryExpression";

export default class SoftmaxGrad extends UnaryExpression {

  constructor(base, grad, {name} = {}) {
    super(base, {name});
    this._grad = grad;
  }

  get grad() {
    return this._grad;
  }

  get shape() {
    return this.base.shape;
  }

  get type() {
    return 'SoftmaxGrad';
  }

  accept(visitor, params) {
    visitor.visitSoftmaxGrad(this, params);
  }

}