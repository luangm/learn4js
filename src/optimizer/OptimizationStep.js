import Expression from "../structure/Expression";

export default class OptimizationStep extends Expression {

  constructor(target, grads, {name} = {}) {
    super({name});

    this._target = target;
    this._grads = grads;
  }

  get grads() {
    return this._grads;
  }

  get shape() {
    return this._target.shape;
  }

  get target() {
    return this._target;
  }
}