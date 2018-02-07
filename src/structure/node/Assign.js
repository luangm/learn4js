import Expression from "../Expression";

export default class Assign extends Expression {

  constructor(target, newValue, {name, scope} = {}) {
    super({name, scope});

    this._target = target;
    this._newValue = newValue;
  }

  get newValue() {
    return this._newValue;
  }

  get shape() {
    return this._target.shape;
  }

  get target() {
    return this._target;
  }

  accept(visitor, params) {
    visitor.visitAssign(this, params);
  }
}