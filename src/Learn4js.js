import ComputeGraph from "./structure/ComputeGraph";
import Constant from "./structure/node/Constant";
import Add from "./structure/node/Add";

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

  constant({name, data, shape}) {
    let node = new Constant({name, data, shape});
    this._activeGraph.add(node);
    return node;
  }

  add({name, left, right}) {
    let node = new Add({name, left, right});
    this._activeGraph.add(node);
    return node;
  }
}

export default new Learn4js();