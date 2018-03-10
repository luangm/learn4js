import TransformExpression from "./TransformExpression";

export default class Log1p extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Log1p';
  }

  accept(visitor, params) {
    visitor.visitLog1p(this, params);
  }

}