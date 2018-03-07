import TransformExpression from "./TransformExpression";

export default class Expm1 extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Expm1';
  }

  accept(visitor, params) {
    visitor.visitExpm1(this, params);
  }

}