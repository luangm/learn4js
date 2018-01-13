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
import Abs from "./structure/node/Abs";
import Logarithm from "./structure/node/Logarithm";
import Conv2d from "./structure/node/Conv2d";
import MaxPool from "./structure/node/MaxPool";
import Softmax from "./structure/node/Softmax";

/**
 * This is main Utility class for this library.
 * This is a singleton
 *
 * By default, a new compute graph is created so user doesn't have to, but can later on change
 * if multiple graphs should exist together.
 */
class Learn4js {

  constructor() {
    this._activeGraph = new ComputeGraph('DEFAULT');
  }

  get activeGraph() {
    return this._activeGraph;
  }

  set activeGraph(value) {
    this._activeGraph = value;
  }

  abs({name, base}) {
    let node = new Abs({name, base});
    this.activeGraph.add(node);
    return node;
  }

  add({name, left, right}) {
    let node = new Add({name, left, right});
    this.activeGraph.add(node);
    return node;
  }

  assign({name, target, value}) {
    let node = new Assign({name, target, value});
    this.activeGraph.add(node);
    return node;
  }

  constant({name, data, shape}) {
    let node = new Constant({name, data, shape});
    this.activeGraph.add(node);
    return node;
  }

  conv2d({name, image, kernel}) {
    let node = new Conv2d({name, image, kernel});
    this.activeGraph.add(node);
    return node;
  }

  cos({name, base}) {
    let node = new Cosine({name, base});
    this.activeGraph.add(node);
    return node;
  }

  exp({name, base}) {
    let node = new Exponential({name, base});
    this.activeGraph.add(node);
    return node;
  }

  fill({name, scalar, shape}) {
    let node = new Fill({name, scalar, shape});
    this.activeGraph.add(node);
    return node;
  }

  /**
   * Computes the gradients of the target wrt the nodes
   *
   * This is only a graph building step, does not do any computation.
   *
   * @param target The target function
   * @param nodes the denominators.
   */
  gradients(target, nodes) {
    let visitor = new ReverseGradientVisitor(target);
    target.accept(visitor);
    this.activeGraph._subGraphs[this.activeGraph.name] = this.activeGraph;
    let gradients = [];
    for (let node of nodes) {
      gradients.push(visitor.graph.getGradient(node));
    }
    return gradients;
  }

  graph(func) {
    func();
  }

  log({name, base}) {
    let node = new Logarithm({name, base});
    this.activeGraph.add(node);
    return node;
  }

  matmul({name, left, right}) {
    let node = new MatMul({name, left, right});
    this.activeGraph.add(node);
    return node;
  }

  maxPool({name, image, kernelShape, strideWidth, strideHeight}) {
    let node = new MaxPool({name, image, kernelShape, strideWidth, strideHeight});
    this.activeGraph.add(node);
    return node;
  }

  multiply({name, left, right}) {
    let node = new Multiply({name, left, right});
    this.activeGraph.add(node);
    return node;
  }

  negate({name, base}) {
    let node = new Negate({name, base});
    this.activeGraph.add(node);
    return node;
  }

  parameter({name, data, shape}) {
    let node = new Parameter({name, data, shape});
    this.activeGraph.add(node);
    return node;
  }

  reduceSum({name, base}) {
    let node = new ReduceSum({name, base});
    this.activeGraph.add(node);
    return node;
  }

  session(graph) {
    let myGraph = graph || this.activeGraph;
    return new Session(myGraph);
  }

  sigmoid({name, base}) {
    let node = new Sigmoid({name, base});
    this.activeGraph.add(node);
    return node;
  }

  sin({name, base}) {
    let node = new Sine({name, base});
    this.activeGraph.add(node);
    return node;
  }

  softmax({name, base}) {
    let node = new Softmax({name, base});
    this.activeGraph.add(node);
    return node;
  }

  sqrt({name, base}) {
    let node = new SquareRoot({name, base});
    this.activeGraph.add(node);
    return node;
  }

  square({name, base}) {
    let node = new Square({name, base});
    this.activeGraph.add(node);
    return node;
  }

  subtract({name, left, right}) {
    let node = new Subtract({name, left, right});
    this.activeGraph.add(node);
    return node;
  }

  tan({name, base}) {
    let node = new Tangent({name, base});
    this.activeGraph.add(node);
    return node;
  }

  variable({name, data, shape}) {
    let node = new Variable({name, data, shape});
    this.activeGraph.add(node);
    return node;
  }
}

export default new Learn4js();