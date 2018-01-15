import UnaryExpression from "./UnaryExpression";

export default class Tangent extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Tangent';
  }

  accept(visitor, params) {
    visitor.visitTangent(this, params);
  }

}