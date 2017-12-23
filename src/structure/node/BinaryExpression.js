import Expression from "../Expression";

export default class BinaryExpression extends Expression {

  constructor({name, left, right}) {
    super(name);
    this._left = left;
    this._right = right;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

}