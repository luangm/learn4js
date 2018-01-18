import UnaryExpression from "./UnaryExpression";

export default class Logarithm extends UnaryExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Logarithm';
  }

  accept(visitor, params) {
    visitor.visitLog(this, params);
  }

}