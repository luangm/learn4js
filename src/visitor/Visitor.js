/**
 * Base class for graph visitors
 */
export default class Visitor {

  /**
   * This is called before each call
   */
  preVisit(node, params) {
    // default empty
  }

  visitAbs(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitAdd(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitAssign(node, params) {
    this.preVisit(node, params);
    node.value.accept(this, params);
  }

  visitConstant(node, params) {
    this.preVisit(node, params);
    // Nothing
  }

  visitConv2d(node, params) {
    this.preVisit(node, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitConv2dImageGrad(node, params) {
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitConv2dKernelGrad(node, params) {
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitCosine(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitDivide(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitExp(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitFill(node, params) {
    this.preVisit(node, params);
    // nothing
  }

  visitGroup(node, params) {
    this.preVisit(node, params);
    for (let exp of node.list) {
      exp.accept(this, params);
    }
  }

  visitIm2Col(node, params) {
    this.preVisit(node, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitLog(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSoftmax(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSoftmaxGrad(node, params) {
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.base.accept(this, params);
  }

  visitMatMul(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMaxPool(node, params) {
    this.preVisit(node, params);
    node.image.accept(this, params);
  }

  visitMaxPoolGrad(node, params) {
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
  }

  visitMultiply(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitNegate(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitParameter(node, params) {
    this.preVisit(node, params);
    // nothing
  }

  visitReciprocal(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitReduceSum(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitRelu(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSigmoid(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSigmoidGrad(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSign(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSine(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSqrt(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSqrtGrad(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSquare(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitStep(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSubtract(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitTangent(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTangentGrad(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTanh(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitVariable(node, params) {
    this.preVisit(node, params);
    // nothing
  }

}