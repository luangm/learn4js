import TransformExpression from "./TransformExpression";

export default class TangentGrad extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'TangentGrad';
  }

  accept(visitor, params) {
    visitor.visitTangentGrad(this, params);
  }

}