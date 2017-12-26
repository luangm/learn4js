import UnaryExpression from "./UnaryExpression";

export default class Negate extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitNegate(this, params);
  }

}