import ComputeGraph from "./ComputeGraph";

/**
 * Gradient Graph is a Compute Graph with map of gradients with the parent graph.
 */
export default class GradientGraph extends ComputeGraph {

  constructor(name) {
    super(name);

    // key = node, value = array of gradients
    this._gradientMap = {};
  }

  get gradientMap() {
    return this._gradientMap;
  }

  addGradient(node, gradientNode) {
    this.add(gradientNode);

    let list = this.gradientMap[node.id];

    if (!list) {
      this.gradientMap[node.id] = [gradientNode];
    } else {
      list.push(gradientNode);
    }

  }

  getGradient(node) {
    let list = this.gradientMap[node.id];
    if (list) {
      if (list.length === 1) {
        return list[0];
      } else {
        return list;
      }
    }
    return null;
  }

}