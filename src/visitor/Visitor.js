/**
 * Base class for graph visitors
 */
export default class Visitor {

  visitAdd(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitAssign(node, params) {
    node.value.accept(this, params);
  }

  visitConstant(node, params) {
    // Nothing
  }

  visitDivide(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitFill(node, params) {
    // nothing
  }

  visitMatMul(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMultiply(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitNegate(node, params) {
    node.base.accept(this, params);
  }

  visitParameter(node, params) {
    // nothing
  }

  visitVariable(node, params) {
    // nothing
  }

  visitReduceSum(node, params) {
    node.base.accept(this, params);
  }

  visitSigmoid(node, params) {
    node.base.accept(this, params);
  }

  visitSigmoidGrad(node, params) {
    node.base.accept(this, params);
  }

  visitSquare(node, params) {
    node.base.accept(this, params);
  }

  visitSubtract(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

}