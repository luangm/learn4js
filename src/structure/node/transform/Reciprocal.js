import TransformExpression from "./TransformExpression";

export default class Reciprocal extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Reciprocal';
  }

  accept(visitor, params) {
    visitor.visitReciprocal(this, params);
  }

}