import UnaryExpression from "./UnaryExpression";

export default class SquareRootGrad extends UnaryExpression {

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