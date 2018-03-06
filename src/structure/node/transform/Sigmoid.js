import TransformExpression from "./TransformExpression";

export default class Sigmoid extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Sigmoid';
  }

  accept(visitor, params) {
    visitor.visitSigmoid(this, params);
  }

}