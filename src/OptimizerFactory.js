import Graph from "./structure/Graph";
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
    return Graph.active;
  }

  set activeGraph(value) {
    Graph.active = value;
  }

  gradientDescent({learnRate} = {}) {
    return new GradientDescentOptimizer({graph: this.activeGraph, learnRate});
  }
}

export default new OptimizerFactory(false);