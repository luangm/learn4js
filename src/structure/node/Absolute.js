import UnaryExpression from "./UnaryExpression";

export default class Absolute extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Absolute'
  }

  accept(visitor, params) {
    visitor.visitAbs(this, params);
  }

}