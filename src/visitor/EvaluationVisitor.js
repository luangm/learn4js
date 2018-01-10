import Visitor from "./Visitor";
import TensorMath from "../core/util/TensorMath";
import Tensor from "../core/Tensor";
import TensorUtils from "../core/util/TensorUtils";

export default class EvaluationVisitor extends Visitor {

  constructor() {
    super();
    this.valueMap = {};
  }

  getValue(node) {
    return this.valueMap[node.id];
  }

  visitAbs(node, params) {
    super.visitAbs(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.abs(base);
  }

  visitAdd(node, params) {
    super.visitAdd(node, params);
    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = TensorMath.add(left, right);
  }

  visitAssign(node, params) {
    super.visitAssign(node, params);
    let value = this.valueMap[node.value.id];
    node.target.value = value;
    this.valueMap[node.id] = value;
    this.valueMap[node.target.id] = value;
  }

  visitConstant(node, params) {
    this.valueMap[node.id] = node.value;
  }

  visitConv2d(node, params) {
    super.visitConv2d(node, params);
    let image = this.valueMap[node.image.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorMath.conv2d(image, kernel);
  }


  visitConv2dImageGrad(node, params) {
    super.visitConv2dImageGrad(node, params);
    let image = this.valueMap[node.image.id];
    let grad = this.valueMap[node.grad.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorMath.conv2dImageGrad(image, kernel, grad);
  }

  visitConv2dKernelGrad(node, params) {
    super.visitConv2dKernelGrad(node, params);
    let image = this.valueMap[node.image.id];
    let grad = this.valueMap[node.grad.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorMath.conv2dKernelGrad(image, kernel, grad);
  }


  visitIm2Col(node, params) {
    super.visitIm2Col(node, params);
    let image = this.valueMap[node.image.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorUtils.im2col(image, kernel);
  }

  visitCosine(node, params) {
    super.visitCosine(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.cos(base);
  }

  visitDivide(node, params) {
    super.visitDivide(node, params);
    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = TensorMath.divide(left, right);
  }

  visitExp(node, params) {
    super.visitExp(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.exp(base);
  }

  visitFill(node, params) {
    super.visitFill(node, params);
    if (!this.valueMap[node.id]) {
      let tensor = new Tensor({shape: node.shape});
      tensor = TensorMath.set(tensor, node.scalar);
      this.valueMap[node.id] = tensor;
    }
  }

  visitMaxPool(node, params) {
    super.visitMaxPool(node, params);
    let image = this.valueMap[node.image.id];
    let kernelShape = node.kernelShape;
    this.valueMap[node.id] = TensorMath.maxPool(image, kernelShape, 2, 2);
  }

  visitMaxPoolGrad(node, params) {
    super.visitMaxPoolGrad(node, params);
    let image = this.valueMap[node.image.id];
    let grad = this.valueMap[node.grad.id];
    let kernelShape = node.kernelShape;
    let kernel = new Tensor({shape: kernelShape});
    this.valueMap[node.id] = TensorMath.maxPoolGrad(image, kernel, grad, {strideWidth: 2, strideHeight: 2});
  }

  visitLog(node, params) {
    super.visitLog(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.log(base);
  }

  visitMatMul(node, params) {
    super.visitMatMul(node, params);
    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = TensorMath.matmul(left, right, node.transposeLeft, node.transposeRight);
  }

  visitMultiply(node, params) {
    super.visitMultiply(node, params);
    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = TensorMath.multiply(left, right);
  }

  visitNegate(node, params) {
    super.visitNegate(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.negate(base);
  }

  visitParameter(node, params) {
    this.valueMap[node.id] = node.value;
  }

  visitReciprocal(node, params) {
    super.visitReciprocal(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.reciprocal(base);
  }

  visitReduceSum(node, params) {
    super.visitReduceSum(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.reduceSum(base, node.reduceDim);
  }

  visitRelu(node, params) {
    super.visitRelu(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.relu(base);
  }

  visitSigmoid(node, params) {
    super.visitSigmoid(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sigmoid(base);
  }

  visitSigmoidGrad(node, params) {
    super.visitSigmoidGrad(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sigmoidGrad(base);
  }

  visitSign(node, params) {
    super.visitSign(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sign(base);
  }

  visitSine(node, params) {
    super.visitSine(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sin(base);
  }

  visitSqrt(node, params) {
    super.visitSqrt(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sqrt(base);
  }

  visitSqrtGrad(node, params) {
    super.visitSqrtGrad(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.sqrtGrad(base);
  }

  visitSquare(node, params) {
    super.visitSquare(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.square(base);
  }

  visitStep(node, params) {
    super.visitStep(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.step(base);
  }

  visitSubtract(node, params) {
    super.visitSubtract(node, params);
    let left = this.valueMap[node.left.id];
    let right = this.valueMap[node.right.id];
    this.valueMap[node.id] = left.subtract(right);
  }

  visitTangent(node, params) {
    super.visitTangent(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.tan(base);
  }

  visitTangentGrad(node, params) {
    super.visitTangentGrad(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.tanGrad(base);
  }

  visitTanh(node, params) {
    super.visitTanh(node, params);
    let base = this.valueMap[node.base.id];
    this.valueMap[node.id] = TensorMath.tanh(base);
  }

  visitVariable(node, params) {
    this.valueMap[node.id] = node.value;
  }
}