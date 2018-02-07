import TransformExpression from "./TransformExpression";

export default class SquareRoot extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'SquareRoot';
  }

  accept(visitor, params) {
    visitor.visitSqrt(this, params);
  }

}