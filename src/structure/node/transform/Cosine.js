import TransformExpression from "./TransformExpression";

export default class Cosine extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Cosine';
  }

  accept(visitor, params) {
    visitor.visitCosine(this, params);
  }

}