import TransformExpression from "./TransformExpression";

export default class Tanh extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Tanh';
  }

  accept(visitor, params) {
    visitor.visitTanh(this, params);
  }

}