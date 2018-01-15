import UnaryExpression from "./UnaryExpression";

export default class SigmoidGrad extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'SigmoidGrad';
  }

  accept(visitor, params) {
    visitor.visitSigmoidGrad(this, params);
  }

}