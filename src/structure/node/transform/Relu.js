import TransformExpression from "./TransformExpression";

export default class Relu extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Relu';
  }

  accept(visitor, params) {
    visitor.visitRelu(this, params);
  }

}