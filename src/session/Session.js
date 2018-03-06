import EvaluationVisitor from "../visitor/EvaluationVisitor";

/**
 * A session object is one that keeps all the tensor values of each Expression node.
 * Also in charge of evaluating the expressions.
 */
export default class Session {

  constructor(graph) {
    this._graph = graph;
    this._valueMap = {}; // key = node.id, value = Tensor
    this._stateMap = {}; // key = node.id, value = isValid {bool}
  }

  get graph() {
    return this._graph;
  }

  eval(node, feed = {}) {
    let visitor = new EvaluationVisitor(this);
    node.accept(visitor);
    return this.getValue(node);
  }

  getValue(node) {
    return this._valueMap[node.id];
  }

  /**
   * Returns if the value stored in session is valid
   * @param node {Expression}
   * @returns {bool}
   */
  isValid(node) {
    return this._stateMap[node.id] || false;
  }

  setValue(node, value) {
    this._valueMap[node.id] = value;
    this._invalidateObservers(node);
    this._stateMap[node.id] = true;
  }

  /**
   * @param node {Expression}
   * @private
   */
  _invalidateObservers(node) {
    for (let observer of node.observers) {
      // only need to trigger invalidation of nodes that are previously validated
      // Also helps to prevent circular reference infinite loop
      if (this.isValid(observer)) {
        this._stateMap[observer.id] = false;  // invalidate self
        this._invalidateObservers(observer);  // invalidate its observers
      }
    }
  }
}