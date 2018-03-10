// import LossFactory from "./LossFactory";
// import OptimizerFactory from "./OptimizerFactory";
import Session from "./session/Session";
import Graph from "./structure/Graph";
// import MaxPool from "./structure/node/cnn/MaxPool";
// import ReverseGradientVisitor from "./visitor/ReverseGradientVisitor";

/**
 * This is main Utility class for this library.
 * This is a singleton
 *
 * By default, a new compute graph is created so user doesn't have to,
 * but can later on change if multiple graphs should exist together.
 *
 * NOTE: This class takes care of dynamic graph building,
 * so that when a node references to the same dependencies as an existing node,
 * only the reference is returned.
 *
 * If somehow there needs to be two nodes of the exactly same dependencies,
 * call the method from the graph directly.
 */
class Learn4js {

  constructor() {
    this._interactive = false;
    // this._loss = LossFactory;
    // this._optimizer = OptimizerFactory;
    this._graph = new Graph('Default');
    this._session = new Session(this._graph);
    this._graph.session = this._session;
  }

  get activeGraph() {
    return this._graph;
  }

  set activeGraph(value) {
    this._graph = value;
  }

  get activeSession() {
    return this._session;
  }

  set activeSession(value) {
    this._session = value;
  }

  get factory() {
    return this._graph.expressionFactory;
  }

  get interactive() {
    return this._interactive;
  }

  set interactive(value) {
    this._interactive = value;
    this.loss.interactive = value;
    this.optimizer.interactive = value;
  }

  get loss() {
    return this._loss;
  }

  get optimizer() {
    return this._optimizer;
  }

  getNode(id) {
    return this.activeGraph.get(id);
  }

  /**
   * Computes the gradients of the target wrt all of its dependencies
   * This is only a graph building step, does not do any computation.
   * The result is the gradients wrt each of the nodes.
   */
  // gradients(target, nodes) {
  //
  //   let visitor = new ReverseGradientVisitor(this.activeGraph);
  //   visitor.visit(target);
  //
  //   let gradients = [];
  //   for (let node of nodes) {
  //     let grad = target.getGradient(node);
  //     if (this.interactive) {
  //       grad.eval();
  //     }
  //     gradients.push(grad);
  //   }
  //   return gradients;
  // }

  graph(func) {
    func();
  }





  // maxPool({name, image, kernelShape, strideWidth, strideHeight}) {
  //   let node = new MaxPool({name, image, kernelShape, strideWidth, strideHeight});
  //   this.activeGraph.add(node);
  //   return node;
  // }





  // session(graph) {
  //   let myGraph = graph || this.activeGraph;
  //   return new Session(myGraph);
  // }





}

export default new Learn4js();

