import TransformExpression from "./TransformExpression";

export default class Tanh extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Tanh';
  }

  accept(visitor, params) {
    visitor.visitTanh(this, params);
  }

}