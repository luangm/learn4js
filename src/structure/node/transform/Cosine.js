import TransformExpression from "./TransformExpression";

export default class Cosine extends TransformExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Cosine';
  }

  accept(visitor, params) {
    visitor.visitCosine(this, params);
  }

}