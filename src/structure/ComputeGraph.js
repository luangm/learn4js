/**
 * Compute Graph containing all the expression nodes.
 */
import ExpressionState from "./constant/ExpressionState";

export default class ComputeGraph {

  constructor(name) {
    this._name = name;
    this._nodes = {}; // a map of all nodes, key = node.name
  }

  get name() {
    return this._name;
  }

  /**
   * Adds a node to the graph
   */
  add(node) {
    this._ensureNodeName(node);
    node.state = ExpressionState.ATTACHED;
    this._nodes[node.name] = node;
  }

  _ensureNodeName(node) {
    if (!node.name) {
      node.name = 'Node' + node.id;
    }
  }


}