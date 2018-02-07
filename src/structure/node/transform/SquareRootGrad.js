import TransformExpression from "./TransformExpression";

export default class SquareRootGrad extends TransformExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'SquareRootGrad';
  }

  accept(visitor, params) {
    visitor.visitSqrtGrad(this, params);
  }

}