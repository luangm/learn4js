import UnaryExpression from "./UnaryExpression";

export default class Exponential extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Exponential';
  }

  accept(visitor, params) {
    visitor.visitExp(this, params);
  }

}