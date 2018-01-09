import UnaryExpression from "./UnaryExpression";

export default class Exponential extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitExp(this, params);
  }

}