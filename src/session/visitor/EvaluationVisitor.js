import Visitor from "../Visitor";

export default class EvaluationVisitor extends Visitor {

  // The map that keeps track of the value of nodes.
  valueMap = {};

  constructor() {
    super();
  }

  visitAdd(node, params) {
    super.visitAdd(node, params);

    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = left.add(right);
  }

  visitConstant(node, params) {
    this.valueMap[node.id] = node.value;
  }

  getValue(node) {
    return this.valueMap[node.id];
  }
}