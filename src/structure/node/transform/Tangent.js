import TransformExpression from "./TransformExpression";

export default class Tangent extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Tangent';
  }

  accept(visitor, params) {
    visitor.visitTangent(this, params);
  }

}