import BinaryExpression from "./BinaryExpression";

export default class Subtract extends BinaryExpression {

  constructor({name, left, right}) {
    super({name, left, right});
  }

  accept(visitor, params) {
    visitor.visitSubtract(this, params);
  }

}