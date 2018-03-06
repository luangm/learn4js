import TransformExpression from "./TransformExpression";

export default class Exponential extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Exponential';
  }

  accept(visitor, params) {
    visitor.visitExp(this, params);
  }

}