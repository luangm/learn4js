import UnaryExpression from "./UnaryExpression";

export default class Sigmoid extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Sigmoid';
  }

  accept(visitor, params) {
    visitor.visitSigmoid(this, params);
  }

}