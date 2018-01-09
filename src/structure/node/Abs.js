import UnaryExpression from "./UnaryExpression";

export default class Abs extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitAbs(this, params);
  }

}