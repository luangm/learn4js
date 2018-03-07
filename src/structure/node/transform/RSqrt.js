import TransformExpression from "./TransformExpression";

export default class RSqrt extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'RSqrt';
  }

  accept(visitor, params) {
    visitor.visitRSqrt(this, params);
  }

}