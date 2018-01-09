import UnaryExpression from "./UnaryExpression";

export default class Sine extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSine(this, params);
  }

}