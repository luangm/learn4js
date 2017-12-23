import UnaryExpression from "./UnaryExpression";

export default class Sigmoid extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSigmoid(this, params);
  }

}