import Expression from "../../Expression";

/**
 * Expressions that transforms a tensor element-wise
 */
export default class TransformExpression extends Expression {

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