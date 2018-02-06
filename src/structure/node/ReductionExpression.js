import Expression from "../Expression";

/**
 * Base class of all Reduction operations.
 * The shape of the result depends on the inputs and reduction dimension
 */
export default class ReductionExpression extends Expression {

  constructor(base, reduceDim = -1, {name, scope} = {}) {
    super({name, scope});
    this._base = base;
    this._reduceDim = reduceDim;
  }

  get base() {
    return this._base;
  }

  get params() {
    return {
      name: this._name,
      base: this.base.id,
      dim: this.reduceDim
    }
  }

  get reduceDim() {
    return this._reduceDim;
  }

  get shape() {
    return this.base.shape;
  }

}