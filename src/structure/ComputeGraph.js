import ExpressionState from "./constant/ExpressionState";

/**
 * Compute Graph containing all the expression nodes.
 */
export default class ComputeGraph {

  constructor(name) {
    this._name = name;
    this._nodes = {}; // a map of all nodes, key = node.name
    this._subGraphs = {}; // a map of all sub graphs.
  }

  get name() {
    return this._name;
  }

  get nodes() {
    return this._nodes;
  }

  get subGraphs() {
    return this._subGraphs;
  }

  /**
   * Adds a node to the graph
   */
  add(node) {
    this._ensureNodeName(node);
    node.state = ExpressionState.ATTACHED;
    this._nodes[node.id] = node;
  }

  _ensureNodeName(node) {
    if (!node.name) {
      node.name = 'Node' + node.id;
    }

    if (this._nodes[node.id]) {
      throw new Error('The name of the node is already defined. name=' + node.name);
    }
  }


}