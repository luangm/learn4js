import Expression from "../Expression";

export default class Assign extends Expression {

  constructor({name, target, value}) {
    super({name});

    this._target = target;
    this._value = value;
  }

  get shape() {
    return this._target.shape;
  }

  get target() {
    return this._target;
  }

  get value() {
    return this._value;
  }

  accept(visitor, params) {
    visitor.visitAssign(this, params);
  }
}