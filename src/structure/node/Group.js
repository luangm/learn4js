import Expression from "../Expression";

export default class Group extends Expression {

  constructor(list, {name, graph, scope} = {}) {
    super({name, graph, scope});
    this._list = list;
  }

  get list() {
    return this._list;
  }

  get params() {
    return {
      name: this._name,
      list: this.list.map(x => x.id)
    }
  }

  get type() {
    return 'Group';
  }

  accept(visitor, params) {
    visitor.visitGroup(this, params);
  }
}