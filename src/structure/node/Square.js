import UnaryExpression from "./UnaryExpression";

export default class Square extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Square';
  }

  accept(visitor, params) {
    visitor.visitSquare(this, params);
  }

}