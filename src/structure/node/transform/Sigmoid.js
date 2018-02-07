import TransformExpression from "./TransformExpression";

export default class Sigmoid extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Sigmoid';
  }

  accept(visitor, params) {
    visitor.visitSigmoid(this, params);
  }

}