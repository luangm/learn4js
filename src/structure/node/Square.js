import UnaryExpression from "./UnaryExpression";

export default class Square extends UnaryExpression {

  constructor(base, {name, scope} = {}) {
    super(base, {name, scope});
  }

  get type() {
    return 'Square';
  }

  accept(visitor, params) {
    visitor.visitSquare(this, params);
  }

}