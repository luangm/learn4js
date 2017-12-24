import ComputeGraph from "./structure/ComputeGraph";
import Constant from "./structure/node/Constant";
import Add from "./structure/node/Add";
import MatMul from "./structure/node/MatMul";
import Sigmoid from "./structure/node/Sigmoid";
import Subtract from "./structure/node/Subtract";
import Square from "./structure/node/Square";
import ReduceSum from "./structure/node/ReduceSum";

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

  add({name, left, right}) {
    let node = new Add({name, left, right});
    this._activeGraph.add(node);
    return node;
  }

  constant({name, data, shape}) {
    let node = new Constant({name, data, shape});
    this._activeGraph.add(node);
    return node;
  }

  matmul({name, left, right}) {
    let node = new MatMul({name, left, right});
    this._activeGraph.add(node);
    return node;
  }

  reduceSum({name, base}) {
    let node = new ReduceSum({name, base});
    this._activeGraph.add(node);
    return node;
  }

  sigmoid({name, base}) {
    let node = new Sigmoid({name, base});
    this._activeGraph.add(node);
    return node;
  }

  square({name, base}) {
    let node = new Square({name, base});
    this._activeGraph.add(node);
    return node;
  }

  subtract({name, left, right}) {
    let node = new Subtract({name, left, right});
    this._activeGraph.add(node);
    return node;
  }
}

export default new Learn4js();