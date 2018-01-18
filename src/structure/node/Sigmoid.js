import UnaryExpression from "./UnaryExpression";

export default class Sigmoid extends UnaryExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Sigmoid';
  }

  accept(visitor, params) {
    visitor.visitSigmoid(this, params);
  }

}