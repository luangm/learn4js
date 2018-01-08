import UnaryExpression from "./UnaryExpression";

export default class Relu extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitRelu(this, params);
  }

}