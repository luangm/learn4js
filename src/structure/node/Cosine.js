import UnaryExpression from "./UnaryExpression";

export default class Cosine extends UnaryExpression {

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