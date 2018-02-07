import TransformExpression from "./TransformExpression";

export default class Negate extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Negate';
  }

  accept(visitor, params) {
    visitor.visitNegate(this, params);
  }

}