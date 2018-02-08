import ExpressionState from './constant/ExpressionState';

/**
 * Default class for expression.
 * The ID is auto-generated and guaranteed to be unique.
 * If a name is not provided then its generated from type and id
 * default state is detached.
 */
export default class Expression {

  constructor({name, scope} = {}) {
    this._id = Expression.ID_COUNTER++;
    this._state = ExpressionState.DETACHED;
    if (name) {
      this._name = name;
    }
    this._observers = [];
    this._graph = null;
    // this._value = null;
    // this._scope = scope;
    // this._gradients = null; // key = target.id, value = [gradient].
  }

  get gradientMap() {
    return this._gradients;
  }

  get graph() {
    return this._graph;
  }

  get id() {
    return this._id;
  }

  get isInvalid() {
    // return true;
    return this._state !== ExpressionState.EVALUATED;
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
    return this.graph.session.getValue(this);
  }

  /**
   * At any given time, the value (a Tensor) of the Expression may be set.
   * This will update the value in the current session.
   */
  set value(val) {
    this.graph.session.setValue(this, val);
    this.state = ExpressionState.MODIFIED;
    this.notifyValueChanged();
  }

  /**
   * Standard visitor pattern, the visitor should be of a Visitor
   * the params depends on the visitor.
   */
  accept(visitor, params) {
    throw new Error('Not Supported');
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  attach(graph) {
    this._graph = graph;
    this._state = ExpressionState.ATTACHED;
  }

  eval() {
    if (this.graph == null) {
      throw new Error('Must attach first');
    }

    return this.graph.session.eval(this);
  }

  getGradient(target) {
    return this._gradients ? this._gradients[target.id] : null;
  }

  notifyValueChanged() {
    for (let id in this._observers) {
      let observer = this._observers[id];
      observer.onEvent();
    }
  }

  onEvent() {
    if (this.state === ExpressionState.EVALUATED) {
      this.state = ExpressionState.MODIFIED;
      this.notifyValueChanged();
    }
  }

  setGradient(targetId, grad) {
    if (!this._gradients) {
      this._gradients = {};
    }
    this._gradients[targetId] = grad;
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