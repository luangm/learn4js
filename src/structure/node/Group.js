import Expression from "../Expression";

export default class Group extends Expression {

  constructor({name, list}) {
    super(name);
    this._list = list;
  }

  get list() {
    return this._list;
  }

  accept(visitor, params) {
    visitor.visitGroup(this, params);
  }
}