import TransformExpression from "./TransformExpression";

export default class Softmax extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Softmax';
  }

  accept(visitor, params) {
    visitor.visitSoftmax(this, params);
  }

}