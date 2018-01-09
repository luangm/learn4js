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

  visitAbs(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let signName = gradName + '/sign';
    let sign = ExpressionFactory.createSign({name: signName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sign});

    node.base.accept(this, result);
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

  visitConstant(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);
  }

  visitConv2d(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let imageGradName = node.name + "/grad_" + node.image.name;
    let kernelGradName = node.name + "/grad_" + node.kernel.name;

    let imageGrad = ExpressionFactory.createConv2dImageGrad({
      name: imageGradName,
      image: node.image,
      kernel: node.kernel,
      grad
    });

    let kernelGrad = ExpressionFactory.createConv2dKernelGrad({
      name: kernelGradName,
      image: node.image,
      kernel: node.kernel,
      grad
    });

    node.image.accept(this, imageGrad);
    node.kernel.accept(this, kernelGrad);
  }

  visitCosine(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let sinName = gradName + '/sin';
    let negName = sinName + '/neg';
    let sin = ExpressionFactory.createSine({name: sinName, base: node.base});
    let neg = ExpressionFactory.createNegate({name: negName, base: sin});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: neg});

    node.base.accept(this, result);
  }

  visitExp(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: node});
    node.base.accept(this, result);
  }

  visitLog(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let recName = gradName + "/reciprocal";

    let reciprocal = ExpressionFactory.createReciprocal({name: recName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: reciprocal});

    node.base.accept(this, result);
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

  visitNegate(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let result = ExpressionFactory.createNegate({name: gradName, base: grad});

    node.base.accept(this, result);
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

  visitRelu(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let stepName = gradName + "/step";

    let step = ExpressionFactory.createStep({name: stepName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: step});

    node.base.accept(this, result);
  }

  visitSigmoid(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let sigGradName = gradName + "/sigGrad";

    let sigGrad = ExpressionFactory.createSigmoidGrad({name: sigGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sigGrad});

    node.base.accept(this, result);
  }

  visitSine(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let cosName = gradName + '/cos';
    let cos = ExpressionFactory.createCosine({name: cosName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: cos});

    node.base.accept(this, result);
  }

  visitSqrt(node, params) {
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let sqrtGradName = gradName + '/sqrtGrad';
    let sqrtGrad = ExpressionFactory.createSqrtGrad({name: sqrtGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sqrtGrad});

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

  visitTangent(node, params) {
    // console.log("RAD.visitSigmoid");
    let grad = this._getGradientOrDefault(node, params);
    this.graph.addGradient(node, grad);

    let gradName = node.name + "/grad_" + node.base.name;
    let sigGradName = gradName + "/sigGrad";

    let sigGrad = ExpressionFactory.createTanGrad({name: sigGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sigGrad});

    node.base.accept(this, result);
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