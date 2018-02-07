import Expression from "../../Expression";

export default class BinaryExpression extends Expression {

  constructor(left, right, {name, scope} = {}) {
    super({name, scope});
    this._left = left;
    this._right = right;
  }

  get left() {
    return this._left;
  }

  get params() {
    return {
      name: this._name,
      left: this.left.id,
      right: this.right.id
    }
  }

  get right() {
    return this._right;
  }
}