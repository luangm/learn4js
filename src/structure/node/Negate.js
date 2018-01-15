import UnaryExpression from "./UnaryExpression";

export default class Negate extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Negate';
  }

  accept(visitor, params) {
    visitor.visitNegate(this, params);
  }

}