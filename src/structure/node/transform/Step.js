import TransformExpression from "./TransformExpression";

export default class Step extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Step';
  }

  accept(visitor, params) {
    visitor.visitStep(this, params);
  }

}