import Logger from "../util/Logger";

let logger = new Logger('Visitor');

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

  visitAbsolute(node, params) {
    logger.info("visitAbsolute", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitAdd(node, params) {
    logger.info("visitAdd", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitAddN(node, params) {
    logger.info("visitAddN", node.name);
    this.preVisit(node, params);
    for (let exp of node.list) {
      exp.accept(this, params);
    }
  }

  visitAssign(node, params) {
    logger.info("visitAssign", node.name);
    this.preVisit(node, params);
    node.value.accept(this, params);
  }

  visitConstant(node, params) {
    logger.info("visitConstant", node.name);
    this.preVisit(node, params);
  }

  visitConv2d(node, params) {
    logger.info("visitConv2d", node.name);
    this.preVisit(node, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitConv2dImageGrad(node, params) {
    logger.info("visitConv2dImageGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitConv2dKernelGrad(node, params) {
    logger.info("visitConv2dKernelGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitCosine(node, params) {
    logger.info("visitCosine", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitDivide(node, params) {
    logger.info("visitDivide", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitExp(node, params) {
    logger.info("visitExp", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitExpm1(node, params) {
    logger.info("visitExpm1", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitFill(node, params) {
    logger.info("visitFill", node.name);
    this.preVisit(node, params);
  }

  visitGradientDescentStep(node, params) {
    logger.info("visitGradientDescentStep", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.target.accept(this, params);
  }

  visitGroup(node, params) {
    logger.info("visitGroup", node.name);
    this.preVisit(node, params);
    for (let exp of node.list) {
      exp.accept(this, params);
    }
  }

  visitIm2Col(node, params) {
    logger.info("visitIm2Col", node.name);
    this.preVisit(node, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitLog(node, params) {
    logger.info("visitLog", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitLog1p(node, params) {
    logger.info("visitLog1p", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitMatMul(node, params) {
    logger.info("visitMatMul", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMaxPool(node, params) {
    logger.info("visitMaxPool", node.name);
    this.preVisit(node, params);
    node.image.accept(this, params);
  }

  visitMaxPoolGrad(node, params) {
    logger.info("visitMaxPoolGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
  }

  visitMaximum(node, params) {
    logger.info("visitMaximum", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMinimum(node, params) {
    logger.info("visitMinimum", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitModulo(node, params) {
    logger.info("visitModulo", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMultiply(node, params) {
    logger.info("visitMultiply", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitNegate(node, params) {
    logger.info("visitNegate", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitParameter(node, params) {
    logger.info("visitParameter", node.name);
    this.preVisit(node, params);
  }

  visitRSqrt(node, params) {
    logger.info("visitRSqrt", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitReciprocal(node, params) {
    logger.info("visitReciprocal", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitReduceSum(node, params) {
    logger.info("visitReduceSum", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitRelu(node, params) {
    logger.info("visitRelu", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitRound(node, params) {
    logger.info("visitRound", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSigmoid(node, params) {
    logger.info("visitSigmoid", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSigmoidGrad(node, params) {
    logger.info("visitSigmoidGrad", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSign(node, params) {
    logger.info("visitSign", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSine(node, params) {
    logger.info("visitSine", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSoftmax(node, params) {
    logger.info("visitSoftmax", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSoftmaxCrossEntropy(node, params) {
    logger.info("visitSoftmaxCrossEntropy", node.name);
    this.preVisit(node, params);
    node.labels.accept(this, params);
    node.logits.accept(this, params);
  }

  visitSoftmaxGrad(node, params) {
    logger.info("visitSoftmaxGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.base.accept(this, params);
  }

  visitSqrt(node, params) {
    logger.info("visitSqrt", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSqrtGrad(node, params) {
    logger.info("visitSqrtGrad", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSquare(node, params) {
    logger.info("visitSquare", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitStep(node, params) {
    logger.info("visitStep", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSubtract(node, params) {
    logger.info("visitSubtract", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitTangent(node, params) {
    logger.info("visitTangent", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTangentGrad(node, params) {
    logger.info("visitTangentGrad", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTanh(node, params) {
    logger.info("visitTanh", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTile(node, params) {
    logger.info("visitTile", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitVariable(node, params) {
    logger.info("visitVariable", node.name);
    this.preVisit(node, params);
  }

}