import TransformExpression from "./TransformExpression";

export default class SquareRootGrad extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'SquareRootGrad';
  }

  accept(visitor, params) {
    visitor.visitSqrtGrad(this, params);
  }

}