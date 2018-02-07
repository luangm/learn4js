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