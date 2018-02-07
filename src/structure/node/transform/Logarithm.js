import TransformExpression from "./TransformExpression";

export default class Logarithm extends TransformExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Logarithm';
  }

  accept(visitor, params) {
    visitor.visitLog(this, params);
  }

}