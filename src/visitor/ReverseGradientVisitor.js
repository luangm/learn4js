import Visitor from "./Visitor";
import Fill from "../structure/node/Fill";
import ExpressionFactory from "../structure/factory/ExpressionFactory";
import GradientGraph from "../structure/GradientGraph";
import Constant from "../structure/node/Constant";
import TensorUtils from "../core/util/TensorUtils";

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
    // console.log("RAD.visitAdd");
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);

    let leftGradName = node.name + "/grad_" + node.left.name;
    let rightGradName = node.name + "/grad_" + node.right.name;

    let leftGrad = ExpressionFactory.createReduceSum({name: leftGradName, base: grad, reduceDim: pair.left});
    let rightGrad = ExpressionFactory.createReduceSum({name: rightGradName, base: grad, reduceDim: pair.right});

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitMultiply(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);

    let leftGradName = node.name + "/grad_" + node.left.name;
    let rightGradName = node.name + "/grad_" + node.right.name;

    let leftMul = ExpressionFactory.createMultiply({name: leftGradName, left: grad, right: node.right});
    let rightMul = ExpressionFactory.createMultiply({name: rightGradName, left: node.left, right: grad});

    let leftGrad = ExpressionFactory.createReduceSum({name: leftGradName, base: leftMul, reduceDim: pair.left});
    let rightGrad = ExpressionFactory.createReduceSum({name: rightGradName, base: rightMul, reduceDim: pair.right});

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitConstant(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);
  }

  visitMatMul(node, params) {
    // console.log("RAD.visitMatMul");
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

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

  visitParameter(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);
  }

  visitReduceSum(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);
    node.base.accept(this, grad);
  }

  visitSigmoid(node, params) {
    // console.log("RAD.visitSigmoid");
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let sigGradName = gradName + "/sigGrad";

    let sigGrad = ExpressionFactory.createSigmoidGrad({name: sigGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sigGrad});

    node.base.accept(this, result);
  }

  visitSquare(node, params) {
    // console.log("RAD.visitSquare");
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let mulName = gradName + '/mul2';
    let mul = ExpressionFactory.createMultiply({name: mulName, left: node.base, right: Constant.TWO});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: mul});

    node.base.accept(this, result);
  }

  visitSubtract(node, params) {
    // console.log("RAD.visitSubtract");
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let rightGradName = node.name + "/grad_" + node.right.name;
    let rightGrad = ExpressionFactory.createNegate({name: rightGradName, base: grad});

    node.left.accept(this, grad);
    node.right.accept(this, rightGrad);
  }

  visitVariable(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);
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