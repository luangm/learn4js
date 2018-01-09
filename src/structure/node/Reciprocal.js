import UnaryExpression from "./UnaryExpression";

export default class Reciprocal extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitReciprocal(this, params);
  }

}