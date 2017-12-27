/**
 * Base class for graph visitors
 */
export default class Visitor {

  visitAdd(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitConstant(node, params) {
    // Nothing
  }

  visitFill(node, params) {
    // nothing
  }

  visitMultiply(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitDivide(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitMatMul(node, params) {
    node.left.accept(this, params);
    node.right.accept(this, params);
  }

  visitNegate(node, params) {
    node.base.accept(this, params);
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