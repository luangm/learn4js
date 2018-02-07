import TransformExpression from "./TransformExpression";

export default class Relu extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Relu';
  }

  accept(visitor, params) {
    visitor.visitRelu(this, params);
  }

}