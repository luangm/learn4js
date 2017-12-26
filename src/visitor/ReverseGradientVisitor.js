import Visitor from "./Visitor";
import Fill from "../structure/node/Fill";
import ExpressionFactory from "../structure/factory/ExpressionFactory";
import GradientGraph from "../structure/GradientGraph";

/**
 * The Reverse Gradient Visitor visit a ComputeGraph from a single node (Source),
 * Then create a GradientGraph as a result.
 *
 * The nodes of the GradientGraph is the gradient of the Source node wrt. each Node from the original ComputeGraph
 */
export default class ReverseGradientVisitor extends Visitor {

  /**
   * @param source The source node of which the visit will start.
   */
  constructor(source) {
    super();
    this._source = source;
    this._graph = new GradientGraph('Gradient of ' + source.name);
  }

  get graph() {
    return this._graph;
  }

  visitAdd(node, params) {
    super.visitAdd(node, params);
    console.log("RAD.visitAdd");
  }

  visitConstant(node, params) {
    // console.log("RAD.visitConst");
    let grad = this._getGradientOrDefault(node, params);
    this._graph.addGradient(node, grad);
  }

  visitMatMul(node, params) {
    // console.log("RAD.visitMatMul");
    let grad = this._getGradientOrDefault(node, params);
    this._graph.addGradient(node, grad);

    let leftGradName = node.name + '/grad_' + node.left.name;
    let rightGradName = node.name + '/grad_' + node.right.name;

    let leftGrad = ExpressionFactory.createMatMul({
      name: leftGradName,
      left: grad,
      right: node.right,
      transposeLeft: false,
      transposeRight: true
    });

    let rightGrad = ExpressionFactory.createMatMul({
      name: rightGradName,
      left: node.left,
      right: grad,
      transposeLeft: true,
      transposeRight: false
    });

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitReduceSum(node, params) {
    super.visitReduceSum(node, params);
    console.log("RAD.visitReduceSum");
  }

  visitSigmoid(node, params) {
    super.visitSigmoid(node, params);
    console.log("RAD.visitSigmoid");
  }

  visitSquare(node, params) {
    super.visitSquare(node, params);
    console.log("RAD.visitSquare");
  }

  visitSubtract(node, params) {
    super.visitSubtract(node, params);
    console.log("RAD.visitSubtract");
  }

  /**
   * This method returns the gradient value of the current node.
   * @private
   */
  _getGradientOrDefault(node, params) {
    if (params) {
      return params;
    }

    return new Fill({scalar: 1, shape: node.shape});
  }
}