import DependencyVisitor from "../visitor/DependencyVisitor";
import ReverseGradientVisitor from "../visitor/ReverseGradientVisitor";
import Parameter from "../structure/node/Parameter";
import Learn4js from "../Learn4js";
import Tensor from "../core/Tensor";
import ExpressionFactory from "../structure/factory/ExpressionFactory";

export default class Optimizer {

  constructor({graph}) {
    this._graph = graph;
  }

  get graph() {
    return this._graph;
  }

  /**
   * All optimizer should implement minimize function.
   * The function should create a optimization node for each Parameter.
   * The returned result should be a Group of OptimizeSteps
   */
  minimize(loss) {
    throw new Error('Child class must implement minimize function')
  }
}