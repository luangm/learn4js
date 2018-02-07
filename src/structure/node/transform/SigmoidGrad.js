import TransformExpression from "./TransformExpression";

export default class SigmoidGrad extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'SigmoidGrad';
  }

  accept(visitor, params) {
    visitor.visitSigmoidGrad(this, params);
  }

}