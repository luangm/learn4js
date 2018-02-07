import TransformExpression from "./TransformExpression";

export default class Sine extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Sine';
  }

  accept(visitor, params) {
    visitor.visitSine(this, params);
  }

}