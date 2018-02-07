import TransformExpression from "./TransformExpression";

export default class Exponential extends TransformExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Exponential';
  }

  accept(visitor, params) {
    visitor.visitExp(this, params);
  }

}