import EvaluationVisitor from "../visitor/EvaluationVisitor";
import ComputeGraph from '../structure/ComputeGraph';

/**
 * A session object is one that keeps all the tensor values of each Expression node.
 * Also in charge of evaluating the expressions.
 */
export default class Session {

  constructor(graph) {
    this._graph = graph;
    this._visitor = new EvaluationVisitor();
  }

  get graph() {
    return this._graph;
  }

  setValue(node, value) {
    this._visitor.setValue(node, value);
  }

  run(node) {
    node.accept(this._visitor);
    return this._visitor.getValue(node);
  }
}

Session.active = new Session(ComputeGraph.active);