import ComputeGraph from "./structure/ComputeGraph";
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

  gradientDescent({learnRate} = {}) {
    return new GradientDescentOptimizer({graph: this.activeGraph, learnRate});
  }
}

export default new OptimizerFactory(false);