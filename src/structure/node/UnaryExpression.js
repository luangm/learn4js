import Expression from "../Expression";

export default class UnaryExpression extends Expression {

  constructor({name, base}) {
    super(name);
    this._base = base;
  }

  get base() {
    return this._base;
  }

  get shape() {
    return this.base.shape;
  }

}