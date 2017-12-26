import EvaluationVisitor from "../visitor/EvaluationVisitor";

/**
 * Session object
 */
export default class Session {

  constructor(graph) {
    this._graph = graph;
  }

  get graph() {
    return this._graph;
  }

  run(node) {
    let visitor = new EvaluationVisitor(node);
    node.accept(visitor);
    return visitor.getValue(node);
  }
}