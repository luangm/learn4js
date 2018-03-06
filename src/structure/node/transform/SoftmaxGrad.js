import TransformExpression from "./TransformExpression";

export default class SoftmaxGrad extends TransformExpression {

  constructor(base, grad, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
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