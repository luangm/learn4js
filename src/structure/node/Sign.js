import UnaryExpression from "./UnaryExpression";

export default class Sign extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSign(this, params);
  }

}