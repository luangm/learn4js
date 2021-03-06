import ExpressionFactory from "./factory/ExpressionFactory";

/**
 * Compute Graph contains:
 * - All Nodes (inc. intermediate)
 */
export default class Graph {

  constructor(name) {
    this._name = name;
    this._nodes = {}; // a map of all nodes, key = node.id
    this._nodeParams = {}; // a map of all node params, key = node.type, value = { id: param}
    this._expressionFactory = new ExpressionFactory(this);
  }

  get expressionFactory() {
    return this._expressionFactory;
  }

  get name() {
    return this._name;
  }

  get nodes() {
    return this._nodes;
  }

  get session() {
    return this._session;
  }

  set session(value) {
    this._session = value;
  }

  /**
   * Adds a node to the graph
   * The graph first checks if there is already a same (params) node existing, if yes, then return it.
   * Use forced = true if want to add it regardless.
   */
  add(node, forced) {
    if (!forced) {
      let existing = this.findNode(node.type, node.params);
      if (existing) {
        return existing;
      }
    }

    // node.state = ExpressionState.ATTACHED;
    this._nodes[node.id] = node;

    if (!this._nodeParams[node.type]) {
      this._nodeParams[node.type] = {};
    }

    if (node.params) {
      this._nodeParams[node.type][node.id] = JSON.stringify(node.params);
    }

    return node;
  }

  /**
   * Try to find a node with the same type and params
   */
  findNode(type, params) {
    if (!params) {
      return null;
    }

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

  get(id) {
    return this._nodes[id];
  }

}