import BinaryExpression from "./BinaryExpression";

export default class MatMul extends BinaryExpression {

  constructor({name, left, right}) {
    super({name, left, right});
  }

  accept(visitor, params) {
    visitor.visitMatMul(this, params);
  }

}