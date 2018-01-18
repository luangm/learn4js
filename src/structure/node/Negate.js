import UnaryExpression from "./UnaryExpression";

export default class Negate extends UnaryExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Negate';
  }

  accept(visitor, params) {
    visitor.visitNegate(this, params);
  }

}