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
    this.activeGraph = value;
  }

  add({name, left, right}) {
    let node = new Add({name, left, right});
    this.activeGraph.add(node);
    return node;
  }

  constant({name, data, shape}) {
    let node = new Constant({name, data, shape});
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

  matmul({name, left, right}) {
    let node = new MatMul({name, left, right});
    this.activeGraph.add(node);
    return node;
  }

  negate({name, base}) {
    let node = new Negate({name, base});
    this.activeGraph.add(node);
    return node;
  }

  reduceSum({name, base}) {
    let node = new ReduceSum({name, base});
    this.activeGraph.add(node);
    return node;
  }

  sigmoid({name, base}) {
    let node = new Sigmoid({name, base});
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
}

export default new Learn4js();