import TransformExpression from "./TransformExpression";

export default class Sign extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Sign';
  }

  accept(visitor, params) {
    visitor.visitSign(this, params);
  }

}