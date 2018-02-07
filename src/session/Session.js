import EvaluationVisitor from "../visitor/EvaluationVisitor";

/**
 * A session object is one that keeps all the tensor values of each Expression node.
 * Also in charge of evaluating the expressions.
 */
export default class Session {

  constructor(graph) {
    this._graph = graph;
    this._valueMap = {}; // key = node.id
  }

  get graph() {
    return this._graph;
  }

  eval(node) {
    return eval(node, {});
  }

  eval(node, feed) {
    let visitor = new EvaluationVisitor(this);
    node.accept(visitor);
    return this.getValue(node);
  }

  getValue(node) {
    return this._valueMap[node.id];
  }

  setValue(node, value) {
    this._valueMap[node.id] = value;
  }
}