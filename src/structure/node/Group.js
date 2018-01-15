import Expression from "../Expression";

export default class Group extends Expression {

  constructor(list, {name} = {}) {
    super({name});
    this._list = list;
  }

  get list() {
    return this._list;
  }

  get type() {
    return 'Group';
  }

  accept(visitor, params) {
    visitor.visitGroup(this, params);
  }
}