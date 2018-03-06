import TransformExpression from "./TransformExpression";

export default class TangentGrad extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'TangentGrad';
  }

  accept(visitor, params) {
    visitor.visitTangentGrad(this, params);
  }

}