import UnaryExpression from "./UnaryExpression";

export default class Softmax extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSoftmax(this, params);
  }

}