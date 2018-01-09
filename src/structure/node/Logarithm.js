import UnaryExpression from "./UnaryExpression";

export default class Logarithm extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitLog(this, params);
  }

}