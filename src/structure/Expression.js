/**
 * Default class for expression.
 * The ID is auto-generated and guaranteed to be unique.
 * If a name is not provided then its generated from type and id
 * default state is detached.
 */
export default class Expression {

  /**
   * base constructor
   * @param graph the graph to attach to. Required
   * @param name the name of the node, optional
   * @param scope the scope of the node, for collapsing node graph, optional
   */
  constructor({name, graph, scope} = {}) {
    this._id = Expression.ID_COUNTER++;
    this._graph = graph;
    this._name = name || null;
    this._observers = [];
    this._gradients = null; // key = target.id, value = [gradient].
  }

  get factory() {
    return this.graph.expressionFactory;
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

  /**
   * Make a distinction between an assigned name and default generated name
   */
  get name() {
    return this._name || this.type + '_' + this.id;
  }

  set name(value) {
    this._name = value;
  }

  get observers() {
    return this._observers;
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

  get type() {
    throw new Error('Expression.type should not be called from base Expression');
  }

  /**
   * Returns the current value of this expression.
   * If a value is not evaluated, it is evaluated at the time of the call.
   *
   */
  get value() {
    let session = this.graph.session;
    if (!session.isValid(this)) {
      return session.eval(this);
    }
    return session.getValue(this);
  }

  /**
   * At any given time, the value (a Tensor) of the Expression may be set.
   * This will update the value in the current session.
   */
  set value(val) {
    this.graph.session.setValue(this, val);
  }

  /**
   * Standard visitor pattern, the visitor should be of a Visitor
   * the params depends on the visitor.
   */
  accept(visitor, params) {
    throw new Error('Not Supported');
  }

  add(other) {
    return this.factory.add(this, other);
  }

  addObserver(observer) {
    this._observers.push(observer);
  }

  divide(other) {
    return this.factory.divide(this, other);
  }

  eval() {
    return this.graph.session.eval(this);
  }

  exp() {
    return this.factory.exp(this);
  }

  getGradient(target) {
    return this._gradients ? this._gradients[target.id] : null;
  }

  multiply(other) {
    return this.factory.multiply(this, other);
  }

  setGradient(targetId, grad) {
    if (!this._gradients) {
      this._gradients = {};
    }
    this._gradients[targetId] = grad;
  }

  subtract(other) {
    return this.factory.subtract(this, other);
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