import TransformExpression from "./TransformExpression";

export default class Square extends TransformExpression {

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