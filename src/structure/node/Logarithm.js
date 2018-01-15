import UnaryExpression from "./UnaryExpression";

export default class Logarithm extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Logarithm';
  }

  accept(visitor, params) {
    visitor.visitLog(this, params);
  }

}