import TransformExpression from "./TransformExpression";

export default class Tangent extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Tangent';
  }

  accept(visitor, params) {
    visitor.visitTangent(this, params);
  }

}