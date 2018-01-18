import Expression from "../Expression";

export default class UnaryExpression extends Expression {

  constructor(base, {name, scope} = {}) {
    super({name, scope});
    this._base = base;
  }

  get base() {
    return this._base;
  }

  get params() {
    return {
      name: this._name,
      base: this.base.id
    }
  }

  get shape() {
    return this.base.shape;
  }

}