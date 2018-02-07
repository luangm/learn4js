import TransformExpression from "./TransformExpression";

export default class Reciprocal extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Reciprocal';
  }

  accept(visitor, params) {
    visitor.visitReciprocal(this, params);
  }

}