import TransformExpression from "./TransformExpression";

export default class Square extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Square';
  }

  accept(visitor, params) {
    visitor.visitSquare(this, params);
  }

}