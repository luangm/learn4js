import TransformExpression from "./TransformExpression";

export default class Logarithm extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Logarithm';
  }

  accept(visitor, params) {
    visitor.visitLog(this, params);
  }

}