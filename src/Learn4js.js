import ComputeGraph from "./structure/ComputeGraph";
import Constant from "./structure/node/Constant";
import Add from "./structure/node/Add";
import MatMul from "./structure/node/MatMul";
import Sigmoid from "./structure/node/Sigmoid";
import Subtract from "./structure/node/Subtract";
import Square from "./structure/node/Square";
import ReduceSum from "./structure/node/ReduceSum";
import ReverseGradientVisitor from "./visitor/ReverseGradientVisitor";
import Fill from "./structure/node/Fill";
import Negate from "./structure/node/Negate";
import Multiply from "./structure/node/Multiply";
import Assign from "./structure/node/Assign";
import Parameter from "./structure/node/Parameter";
import Variable from "./structure/node/Variable";
import Session from "./session/Session";
import Sine from "./structure/node/Sine";
import Cosine from "./structure/node/Cosine";
import Tangent from "./structure/node/Tangent";
import Exponential from "./structure/node/Exponential";
import SquareRoot from "./structure/node/SquareRoot";
import Absolute from "./structure/node/Absolute";
import Logarithm from "./structure/node/Logarithm";
import Conv2d from "./structure/node/Conv2d";
import MaxPool from "./structure/node/MaxPool";
import Softmax from "./structure/node/Softmax";
import LossFactory from "./LossFactory";
import OptimizerFactory from "./OptimizerFactory";
import Sign from "./structure/node/Sign";

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
    this._loss = LossFactory;
    this._optimizer = OptimizerFactory;
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
    return this._addNode(new Absolute(base, {name}));
  }

  add(left, right, {name} = {}) {
    return this._addNode(new Add(left, right, {name}));
  }

  assign(target, assignment, {name} = {}) {
    return this._addNode(new Assign(target, assignment, {name}));
  }

  constant(value, {name} = {}) {
    return this._addNode(new Constant(value, {name}));
  }

  conv2d({name, image, kernel}) {
    let node = new Conv2d({name, image, kernel});
    this.activeGraph.add(node);
    return node;
  }

  cos(base, {name} = {}) {
    return this._addNode(new Cosine(base, {name}));
  }

  exp(base, {name} = {}) {
    return this._addNode(new Exponential(base, {name}));
  }

  fill(scalar, shape, {name} = {}) {
    return this._addNode(new Fill(scalar, shape, {name}));
  }

  getNode(id) {
    return this.activeGraph.get(id);
  }

  /**
   * Computes the gradients of the target wrt all of its dependencies
   * This is only a graph building step, does not do any computation.
   * The result is the gradients wrt each of the nodes.
   */
  gradients(target, nodes) {

    let visitor = new ReverseGradientVisitor(this.activeGraph);
    visitor.visit(target);

    let gradients = [];
    for (let node of nodes) {
      let grad = target.getGradient(node);
      if (this.interactive) {
        grad.eval();
      }
      gradients.push(grad);
    }
    return gradients;
  }

  graph(func) {
    func();
  }

  log(base, {name} = {}) {
    return this._addNode(new Logarithm(base, {name}));
  }

  matmul(left, right, {name} = {}) {
    return this._addNode(new MatMul(left, right, {name}));
  }

  maxPool({name, image, kernelShape, strideWidth, strideHeight}) {
    let node = new MaxPool({name, image, kernelShape, strideWidth, strideHeight});
    this.activeGraph.add(node);
    return node;
  }

  multiply(left, right, {name} = {}) {
    return this._addNode(new Multiply(left, right, {name}));
  }

  negate(base, {name} = {}) {
    return this._addNode(new Negate(base, {name}));
  }

  parameter(value, {name} = {}) {
    return this._addNode(new Parameter(value, {name}));
  }

  reduceSum(base, reduceDim = -1, {name} = {}) {
    return this._addNode(new ReduceSum(base, {name, reduceDim}));
  }

  session(graph) {
    let myGraph = graph || this.activeGraph;
    return new Session(myGraph);
  }

  sigmoid(base, {name} = {}) {
    return this._addNode(new Sigmoid(base, {name}));
  }

  sign(base, {name} = {}) {
    return this._addNode(new Sign(base, {name}));
  }

  sin(base, {name} = {}) {
    return this._addNode(new Sine(base, {name}));
  }

  softmax(base, {name} = {}) {
    return this._addNode(new Softmax(base, {name}));
  }

  sqrt(base, {name} = {}) {
    return this._addNode(new SquareRoot(base, {name}));
  }

  square(base, {name} = {}) {
    return this._addNode(new Square(base, {name}));
  }

  subtract(left, right, {name} = {}) {
    return this._addNode(new Subtract(left, right, {name}));
  }

  tan(base, {name} = {}) {
    return this._addNode(new Tangent(base, {name}));
  }

  variable(shape, {name} = {}) {
    return this._addNode(new Variable(shape, {name}));
  }

  _addNode(node) {
    node = this.activeGraph.add(node);
    if (this.interactive) {
      node.eval();
    }
    return node;
  }
}


export default new Learn4js();