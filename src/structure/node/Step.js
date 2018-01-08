import UnaryExpression from "./UnaryExpression";

export default class Step extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitStep(this, params);
  }

}