import Expression from "../Expression";

/**
 * AddN node is trying to add up multiple nodes at the same time.
 * this is designed for adding up gradients, not for normal graphs.
 * This op does NOT broadcast. All nodes must have the same shape.
 */
export default class AddN extends Expression {

  constructor(list, {name, graph, scope} = {}) {
    super({name, graph, scope});

    this._list = list;
  }

  get list() {
    return this._list;
  }

  get shape() {
    return this._list[0].shape;
  }

  get type() {
    return 'AddN';
  }

  accept(visitor, params) {
    visitor.visitAddN(this, params);
  }
}