import ExpressionState from './constant/ExpressionState';
import Session from '../session/Session';

/**
 * Default class for expression.
 * The ID is auto-generated and guaranteed to be unique.
 * If a name is not provided then its generated from type and id
 * default state is detached.
 */
export default class Expression {

  constructor({name} = {}) {
    this._id = Expression.ID_COUNTER++;
    this._state = ExpressionState.DETACHED;
    this._name = name;
    this._value = null;
  }

  get id() {
    return this._id;
  }

  /**
   * Make a distinction between an assigned name and default generated name
   */
  get name() {
    return this._name || this.type + '_' + this.id;
  }

  set name(value) {
    this._name = value;
  }

  /**
   * The .params returns all the params of the Expression, including name, excluding id, type and state.
   * This SHOULD be overriden by child classes
   * This is used when adding to graph and trying to de-dup.
   */
  get params() {
    return {
      name: this._name
    }
  }

  get session() {
    return Session.active;
  }

  get shape() {
    throw new Error('Expression.shape should not be called from base Expression');
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
  }

  get type() {
    throw new Error('Expression.type should not be called from base Expression');
  }

  /**
   * Returns the current value of this expression.
   * In Interactive mode, the value is immediately available after Node creation.
   * In Normal mode, the value will be null. Should call eval() first before calling value.
   */
  get value() {
    return this._value;
  }

  /**
   * At any given time, the value (a Tensor) of the Expression may be set.
   * This will update the value in the current session.
   */
  set value(val) {
    this.session.setValue(this, val);
  }

  /**
   * Standard visitor pattern, the visitor should be of a Visitor
   * the params depends on the visitor.
   */
  accept(visitor, params) {
    throw new Error('Not Supported');
  }

  // gradients(grad) {
  //   let gradVisitor = new ReverseGradientVisitor();
  //   this.accept(gradVisitor, grad);
  //   return gradVisitor.graph;
  // }

  /**
   * Forces an evaluation of the current expression at the given session.
   * If a session is not provided, then default session is used.
   */
  eval(session) {
    session = session || Session.active;
    this._value = session.run(this);
    return this._value;
  }

  toString() {
    let result = this.name + '[' + this.id + ']: ';
    if (this.value) {
      return result + this.value.toString();
    }
    return result + 'Not Evaluated';
  }
}

Expression.ID_COUNTER = 0;