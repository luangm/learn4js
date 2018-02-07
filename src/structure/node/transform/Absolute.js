import TransformExpression from "./TransformExpression";

export default class Absolute extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Absolute';
  }

  accept(visitor, params) {
    visitor.visitAbsolute(this, params);
  }

}