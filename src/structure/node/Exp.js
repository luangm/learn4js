import UnaryExpression from "./UnaryExpression";

export default class Exp extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitExp(this, params);
  }

}