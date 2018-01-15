import UnaryExpression from "./UnaryExpression";

export default class Sign extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Sign';
  }

  accept(visitor, params) {
    visitor.visitSign(this, params);
  }

}