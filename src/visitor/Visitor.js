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

  visitDivide(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
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

  visitMatMul(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
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

  visitReduceSum(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitRelu(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitStep(node, params) {
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

  visitSquare(node, params) {
    this.preVisit(node, params);
    node.base.accept(this, params);
  }

  visitSubtract(node, params) {
    this.preVisit(node, params);
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitVariable(node, params) {
    this.preVisit(node, params);
    // nothing
  }

}