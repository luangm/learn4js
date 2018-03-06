import TransformExpression from "./TransformExpression";

export default class Negate extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Negate';
  }

  accept(visitor, params) {
    visitor.visitNegate(this, params);
  }

}