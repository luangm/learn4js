import Visitor from "../Visitor";
import TensorMath from "../../core/TensorMath";

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

  visitSubtract(node, params) {
    super.visitSubtract(node, params);

    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = left.subtract(right);
  }

  visitConstant(node, params) {
    this.valueMap[node.id] = node.value;
  }


  visitMatMul(node, params) {
    super.visitMatMul(node, params);

    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = left.mmul(right);
  }

  visitSigmoid(node, params) {
    super.visitSigmoid(node, params);

    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sigmoid(base);
  }

  visitSquare(node, params) {
    super.visitSquare(node, params);

    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.square(base);
  }

  getValue(node) {
    return this.valueMap[node.id];
  }
}