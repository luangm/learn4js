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

}