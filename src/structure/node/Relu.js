import UnaryExpression from "./UnaryExpression";

export default class Relu extends UnaryExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Relu';
  }

  accept(visitor, params) {
    visitor.visitRelu(this, params);
  }

}