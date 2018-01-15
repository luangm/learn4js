import Expression from "../structure/Expression";

export default class OptimizationStep extends Expression {

  constructor(target, grad, {name} = {}) {
    super({name});

    this._target = target;
    this._grad = grad;
  }

  get grad() {
    return this._grad;
  }

  get shape() {
    return this._target.shape;
  }

  get target() {
    return this._target;
  }
}