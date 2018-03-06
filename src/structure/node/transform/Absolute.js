import TransformExpression from "./TransformExpression";

export default class Absolute extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Absolute';
  }

  accept(visitor, params) {
    visitor.visitAbsolute(this, params);
  }

}