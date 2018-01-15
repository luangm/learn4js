import UnaryExpression from "./UnaryExpression";

export default class Step extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Step';
  }

  accept(visitor, params) {
    visitor.visitStep(this, params);
  }

}