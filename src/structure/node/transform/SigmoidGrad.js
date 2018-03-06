import TransformExpression from "./TransformExpression";

export default class SigmoidGrad extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'SigmoidGrad';
  }

  accept(visitor, params) {
    visitor.visitSigmoidGrad(this, params);
  }

}