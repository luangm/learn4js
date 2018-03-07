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

  abs(base, {name} = {}) {
    return this.factory.abs(base, {name});
  }

  add(left, right, {name} = {}) {
    return this.factory.add(left, right, {name});
  }

  assign(target, value, {name} = {}) {
    return this.factory.assign(target, value, {name});
  }

  constant(value, {name} = {}) {
    return this.factory.constant(value, {name});
  }

  conv2d(image, kernel, {name} = {}) {
    return this.factory.conv2d(image, kernel, {name});
  }

  cos(base, {name} = {}) {
    return this.factory.cos(base, {name});
  }

  divide(left, right, {name} = {}) {
    return this.factory.divide(left, right, {name});
  }

  exp(base, {name} = {}) {
    return this.factory.exp(base, {name});
  }

  expm1(base, {name} = {}) {
    return this.factory.expm1(base, {name});
  }

  fill(scalar, shape, {name} = {}) {
    return this.factory.fill(scalar, shape, {name});
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

  log(base, {name} = {}) {
    return this.factory.log(base, {name});
  }

  matmul(left, right, transposeLeft, transposeRight, {name} = {}) {
    return this.factory.matmul(left, right, transposeLeft, transposeRight, {name});
  }

  multiply(left, right, {name} = {}) {
    return this.factory.multiply(left, right, {name});
  }

  // maxPool({name, image, kernelShape, strideWidth, strideHeight}) {
  //   let node = new MaxPool({name, image, kernelShape, strideWidth, strideHeight});
  //   this.activeGraph.add(node);
  //   return node;
  // }

  negate(base, {name} = {}) {
    return this.factory.negate(base, {name});
  }

  parameter(value, {name} = {}) {
    return this.factory.parameter(value, {name});
  }

  reciprocal(base, {name} = {}) {
    return this.factory.reciprocal(base, {name});
  }

  reduceSum(base, dimension = -1, {name} = {}) {
    return this.factory.reduceSum(base, dimension, {name});
  }

  round(base, {name} = {}) {
    return this.factory.round(base, {name});
  }

  rsqrt(base, {name} = {}) {
    return this.factory.rsqrt(base, {name});
  }

  // session(graph) {
  //   let myGraph = graph || this.activeGraph;
  //   return new Session(myGraph);
  // }

  sigmoid(base, {name} = {}) {
    return this.factory.sigmoid(base, {name});
  }

  sign(base, {name} = {}) {
    return this.factory.sign(base, {name});
  }

  sin(base, {name} = {}) {
    return this.factory.sin(base, {name});
  }

  softmax(base, {name} = {}) {
    return this.factory.softmax(base, {name});
  }

  sqrt(base, {name} = {}) {
    return this.factory.sqrt(base, {name});
  }

  square(base, {name} = {}) {
    return this.factory.square(base, {name});
  }

  subtract(left, right, {name} = {}) {
    return this.factory.subtract(left, right, {name});
  }

  tan(base, {name} = {}) {
    return this.factory.tan(base, {name});
  }

  tanh(base, {name} = {}) {
    return this.factory.tanh(base, {name});
  }

  variable(shape, {name} = {}) {
    return this.factory.variable(shape, {name});
  }

}

export default new Learn4js();