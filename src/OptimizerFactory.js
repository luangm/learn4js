import ComputeGraph from "./structure/ComputeGraph";
import Session from "./session/Session";
import SumSquaredError from "./structure/node/SumSquaredError";
import GradientDescentOptimizer from "./optimizer/GradientDescentOptimizer";

/**
 * This is a convenience for Optimizers
 * The quick reference is Learn4js.optimizer
 */
class OptimizerFactory {

  constructor(interactive) {
    this._interactive = interactive;
  }

  get activeGraph() {
    return ComputeGraph.active;
  }

  set activeGraph(value) {
    ComputeGraph.active = value;
  }

  get activeSession() {
    return Session.active;
  }

  set activeSession(value) {
    Session.active = value;
  }

  get interactive() {
    return this._interactive;
  }

  set interactive(value) {
    this._interactive = value;
  }

  gradientDescent({learnRate} = {}) {
    return new GradientDescentOptimizer({graph: this.activeGraph, learnRate});
  }

  sumSquaredError(label, prediction, {name} = {}) {
    return this._addOrGet(new SumSquaredError(label, prediction, {name}));
  }

  _addOrGet(node) {
    let existing = this.activeGraph.findNode(node.type, node.params);
    if (existing) {
      if (this.interactive) {
        existing.eval();
      }
      return existing;
    }
    this.activeGraph.add(node);
    if (this.interactive) {
      node.eval();
    }
    return node;
  }
}

export default new OptimizerFactory(false);