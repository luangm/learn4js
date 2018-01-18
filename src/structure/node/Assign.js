import Expression from "../Expression";

export default class Assign extends Expression {

  constructor(target, assignment, {name, scope} = {}) {
    super({name, scope});

    this._target = target;
    this._assignment = assignment;
  }

  get assignment() {
    return this._assignment;
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