import UnaryExpression from "./UnaryExpression";

export default class SquareRoot extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'SquareRoot';
  }

  accept(visitor, params) {
    visitor.visitSqrt(this, params);
  }

}