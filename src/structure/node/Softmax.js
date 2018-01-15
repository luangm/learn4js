import UnaryExpression from "./UnaryExpression";

export default class Softmax extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Softmax';
  }

  accept(visitor, params) {
    visitor.visitSoftmax(this, params);
  }

}