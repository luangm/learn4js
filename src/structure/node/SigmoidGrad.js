import UnaryExpression from "./UnaryExpression";

export default class SigmoidGrad extends UnaryExpression {

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