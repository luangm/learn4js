import TransformExpression from "./TransformExpression";

export default class Sine extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Sine';
  }

  accept(visitor, params) {
    visitor.visitSine(this, params);
  }

}