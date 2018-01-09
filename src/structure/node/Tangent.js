import UnaryExpression from "./UnaryExpression";

export default class Tangent extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitTangent(this, params);
  }

}