import Visitor from "../Visitor";
import TensorMath from "../../core/TensorMath";
import Tensor from "../../core/Tensor";

export default class EvaluationVisitor extends Visitor {

  constructor() {
    super();
    this.valueMap = {};
  }

  getValue(node) {
    return this.valueMap[node.id];
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

  visitFill(node, params) {
    super.visitFill(node, params);
    if (!this.valueMap[node.id]) {
      let tensor = new Tensor(node.shape);
      tensor = TensorMath.set(tensor, node.scalar);
      this.valueMap[node.id] = tensor;
    }
  }

  visitMatMul(node, params) {
    super.visitMatMul(node, params);

    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = left.mmul(right);
  }

  visitReduceSum(node, params) {
    super.visitReduceSum(node, params);

    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = base.sum();
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

  visitSubtract(node, params) {
    super.visitSubtract(node, params);

    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = left.subtract(right);
  }
}