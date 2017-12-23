/**
 * Default class for expression
 */
import ExpressionState from "./constant/ExpressionState";

export default class Expression {

  static ID_COUNTER = 0;

  constructor(name) {
    this._name = name;
    this._state = ExpressionState.DETACHED;
    this._id = Expression.ID_COUNTER++;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  /**
   * Change the name of the node.
   * Note: Calling this AFTER it has been attached to a graph will result in Error,
   * since some graph internals depends on this.
   *
   * To change a name, first detach the node from the graph.
   */
  set name(value) {
    this._name = value;
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
  }

  accept(visitor, params) {
    throw new Error('Not Supported');
  }

  toString() {
    return this.name + '[' + this.id + ']';
  }
}