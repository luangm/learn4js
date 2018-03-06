import TransformExpression from "./TransformExpression";

export default class Sign extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Sign';
  }

  accept(visitor, params) {
    visitor.visitSign(this, params);
  }

}