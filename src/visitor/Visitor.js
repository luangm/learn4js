import Logger from "../util/Logger";

/**
 * Base class for graph visitors
 */
export default class Visitor {

  get logger() {
    if (!this._logger) {
      this._logger = new Logger('Visitor');
    }
    return this._logger;
  }

  /**
   * This is called before each call
   */
  preVisit(node, params) {
    // default empty
  }

  visitAbsolute(node, params) {
    this.logger.info("visitAbsolute", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitAdd(node, params) {
    this.logger.info("visitAdd", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitAddN(node, params) {
    this.logger.info("visitAddN", node.name);
    this.preVisit(node, params);
    for (let exp of node.list) {
      exp.accept(this, params);
    }
  }

  visitAssign(node, params) {
    this.logger.info("visitAssign", node.name);
    this.preVisit(node, params);
    node.value.accept(this, params);
  }

  visitConstant(node, params) {
    this.logger.info("visitConstant", node.name);
    this.preVisit(node, params);
  }

  visitConv2d(node, params) {
    this.logger.info("visitConv2d", node.name);
    this.preVisit(node, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitConv2dImageGrad(node, params) {
    this.logger.info("visitConv2dImageGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitConv2dKernelGrad(node, params) {
    this.logger.info("visitConv2dKernelGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitCosine(node, params) {
    this.logger.info("visitCosine", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitDivide(node, params) {
    this.logger.info("visitDivide", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitExp(node, params) {
    this.logger.info("visitExp", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitFill(node, params) {
    this.logger.info("visitFill", node.name);
    this.preVisit(node, params);
  }

  visitGradientDescentStep(node, params) {
    this.logger.info("visitGradientDescentStep", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.target.accept(this, params);
  }

  visitGroup(node, params) {
    this.logger.info("visitGroup", node.name);
    this.preVisit(node, params);
    for (let exp of node.list) {
      exp.accept(this, params);
    }
  }

  visitIm2Col(node, params) {
    this.logger.info("visitIm2Col", node.name);
    this.preVisit(node, params);
    node.image.accept(this, params);
    node.kernel.accept(this, params);
  }

  visitLog(node, params) {
    this.logger.info("visitLog", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitMatMul(node, params) {
    this.logger.info("visitMatMul", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMaxPool(node, params) {
    this.logger.info("visitMaxPool", node.name);
    this.preVisit(node, params);
    node.image.accept(this, params);
  }

  visitMaxPoolGrad(node, params) {
    this.logger.info("visitMaxPoolGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.image.accept(this, params);
  }

  visitMultiply(node, params) {
    this.logger.info("visitMultiply", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitNegate(node, params) {
    this.logger.info("visitNegate", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitParameter(node, params) {
    this.logger.info("visitParameter", node.name);
    this.preVisit(node, params);
  }

  visitReciprocal(node, params) {
    this.logger.info("visitReciprocal", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitReduceSum(node, params) {
    this.logger.info("visitReduceSum", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitRelu(node, params) {
    this.logger.info("visitRelu", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSigmoid(node, params) {
    this.logger.info("visitSigmoid", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSigmoidGrad(node, params) {
    this.logger.info("visitSigmoidGrad", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSign(node, params) {
    this.logger.info("visitSign", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSine(node, params) {
    this.logger.info("visitSine", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSoftmax(node, params) {
    this.logger.info("visitSoftmax", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSoftmaxCrossEntropy(node, params) {
    this.logger.info("visitSoftmaxCrossEntropy", node.name);
    this.preVisit(node, params);
    node.labels.accept(this, params);
    node.logits.accept(this, params);
  }

  visitSoftmaxGrad(node, params) {
    this.logger.info("visitSoftmaxGrad", node.name);
    this.preVisit(node, params);
    node.grad.accept(this, params);
    node.base.accept(this, params);
  }

  visitSqrt(node, params) {
    this.logger.info("visitSqrt", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSqrtGrad(node, params) {
    this.logger.info("visitSqrtGrad", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSquare(node, params) {
    this.logger.info("visitSquare", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitStep(node, params) {
    this.logger.info("visitStep", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSubtract(node, params) {
    this.logger.info("visitSubtract", node.name);
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitTangent(node, params) {
    this.logger.info("visitTangent", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTangentGrad(node, params) {
    this.logger.info("visitTangentGrad", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitTanh(node, params) {
    this.logger.info("visitTanh", node.name);
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitVariable(node, params) {
    this.logger.info("visitVariable", node.name);
    this.preVisit(node, params);
  }

}