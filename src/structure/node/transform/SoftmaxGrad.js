import TransformExpression from "./TransformExpression";

export default class SoftmaxGrad extends TransformExpression {

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