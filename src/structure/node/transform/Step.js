import TransformExpression from "./TransformExpression";

export default class Step extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Step';
  }

  accept(visitor, params) {
    visitor.visitStep(this, params);
  }

}