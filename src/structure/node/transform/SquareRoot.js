import TransformExpression from "./TransformExpression";

export default class SquareRoot extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'SquareRoot';
  }

  accept(visitor, params) {
    visitor.visitSqrt(this, params);
  }

}