import TransformExpression from "./TransformExpression";

export default class Softmax extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Softmax';
  }

  accept(visitor, params) {
    visitor.visitSoftmax(this, params);
  }

}