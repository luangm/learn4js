import ExpressionState from "./constant/ExpressionState";

/**
 * Compute Graph containing all the expression nodes.
 * TODO: Check name conflicts
 *
 *
 */
export default class ComputeGraph {

  constructor(name) {
    this._name = name;
    this._nodes = {}; // a map of all nodes, key = node.id
    this._nodeParams = {}; // a map of all node params, key = node.type, value = { id: param}
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
    node.state = ExpressionState.ATTACHED;
    this._nodes[node.id] = node;

    if (!this._nodeParams[node.type]) {
      this._nodeParams[node.type] = {};
    }
    this._nodeParams[node.type][node.id] = JSON.stringify(node.params);
  }

  /**
   * Try to find a node with the same type and params
   */
  findNode(type, params) {
    let paramJson = JSON.stringify(params);
    let list = this._nodeParams[type];
    if (list) {
      for (let id in list) {
        if (paramJson === list[id]) {
          return this._nodes[id];
        }
      }
    }
  }

}

ComputeGraph.active = new ComputeGraph('DEFAULT');