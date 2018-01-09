import UnaryExpression from "./UnaryExpression";

export default class Cosine extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitCosine(this, params);
  }

}