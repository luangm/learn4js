import Session from '../session/Session';

/**
 * Default class for expression.
 * The ID is auto-generated and guaranteed to be unique.
 * If a name is not provided then its generated from type and id
 * default state is detached.
 */
export default class Expression {

  constructor({name, scope} = {}) {
    this._id = Expression.ID_COUNTER++;
    // this._state = ExpressionState.DETACHED;
    if (name) {
      this._name = name;
    }
    // this._value = null;
    // this._scope = scope;
    // this._gradients = null; // key = target.id, value = [gradient].
  }

  get gradientMap() {
    return this._gradients;
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

  /**
   * The scope of an Expression
   * is when an expression can be safely hidden in a parent element without external references.
   */
  get scope() {
    return this._scope;
  }

  set scope(val) {
    this._scope = val;
  }

  get session() {
    return Session.active;
  }

  get shape() {
    throw new Error('Expression.shape should not be called from base Expression');
  }

  // get state() {
  //   return this._state;
  // }
  //
  // set state(value) {
  //   this._state = value;
  // }

  get type() {
    throw new Error('Expression.type should not be called from base Expression');
  }

  /**
   * Returns the current value of this expression.
   * In Interactive mode, the value is immediately available after Node creation.
   * In Normal mode, the value will be null. Should call eval() first before calling value.
   */
  get value() {
    return this.session.getValue(this);
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

  addGradient(target, grad) {
    if (!this._gradients) {
      this._gradients = {};
    }
    if (!this._gradients[target.id]) {
      this._gradients[target.id] = [];
    }
    this._gradients[target.id].push(grad);
  }

  /**
   * Forces an evaluation of the current expression at the given session.
   * If a session is not provided, then default session is used.
   */
  eval(session) {
    session = session || Session.active;
    this._value = session.run(this);
    return this._value;
  }

  getGradients(target) {
    if (!this._gradients) {
      return [];
    }
    return this._gradients[target.id] || [];
  }

  toString() {
    let result = this.name + '[' + this.id + ']: ';
    if (this.value) {
      return result + this.value.toString();
    }
    return result + 'Not Evaluated';
  }
}

Expression.ID_COUNTER = 1;