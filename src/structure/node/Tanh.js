import UnaryExpression from "./UnaryExpression";

export default class Tanh extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitTanh(this, params);
  }

}