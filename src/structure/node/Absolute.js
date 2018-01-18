import UnaryExpression from "./UnaryExpression";

export default class Absolute extends UnaryExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Absolute'
  }

  accept(visitor, params) {
    visitor.visitAbs(this, params);
  }

}