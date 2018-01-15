import Visitor from "./Visitor";
import Fill from "../structure/node/Fill";
import ExpressionFactory from "../structure/factory/ExpressionFactory";
import GradientGraph from "../structure/GradientGraph";
import Constant from "../structure/node/Constant";
import TensorUtils from "../core/util/TensorUtils";
import MatMul from "../structure/node/MatMul";

/**
 * The Reverse Gradient Visitor visit a ComputeGraph from a single node (Source),
 * Then create a GradientGraph as a result.
 *
 * The nodes of the GradientGraph is the gradient of the Source node wrt. each Node from the original ComputeGraph
 */
export default class ReverseGradientVisitor extends Visitor {

  constructor() {
    super();
    this._graph = new GradientGraph();
  }

  get graph() {
    return this._graph;
  }

  addNode(node) {
    let existing = this.graph.findNode(node.type, node.params);
    if (existing) {
      return existing;
    }
    this.graph.add(node);
    return node;
  }

  /**
   * This method returns the gradient value of the current node.
   */
  getGradient(node, params) {
    let grad = params || new Fill(1, node.shape);
    let existing = this.graph.findNode(grad.type, grad.params);
    let result = existing || grad;
    this.graph.addGradient(node, result);
    return result;
  }

  visitAbsolute(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let signName = gradName + '/sign';
    let sign = ExpressionFactory.createSign({name: signName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sign});

    node.base.accept(this, result);
  }

  visitAdd(node, params) {
    let grad = this.getGradient(node, params);

    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);

    let leftGradName = node.name + "/grad_" + node.left.name;
    let rightGradName = node.name + "/grad_" + node.right.name;

    let leftGrad = ExpressionFactory.createReduceSum({name: leftGradName, base: grad, reduceDim: pair.left});
    let rightGrad = ExpressionFactory.createReduceSum({name: rightGradName, base: grad, reduceDim: pair.right});

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitConstant(node, params) {
    let grad = this.getGradient(node, params);
  }

  visitConv2d(node, params) {
    let grad = this.getGradient(node, params);

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
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let sinName = gradName + '/sin';
    let negName = sinName + '/neg';
    let sin = ExpressionFactory.createSine({name: sinName, base: node.base});
    let neg = ExpressionFactory.createNegate({name: negName, base: sin});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: neg});

    node.base.accept(this, result);
  }

  visitExp(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: node});
    node.base.accept(this, result);
  }

  visitLog(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let recName = gradName + "/reciprocal";

    let reciprocal = ExpressionFactory.createReciprocal({name: recName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: reciprocal});

    node.base.accept(this, result);
  }

  visitMatMul(node, params) {
    let grad = this.getGradient(node, params);

    let leftName = node.name + '/' + node.left.name;
    let rightName = node.name + '/' + node.right.name;

    let leftGrad = new MatMul(grad, node.right, {name: leftName, transposeRight: true});
    leftGrad = this.addNode(leftGrad);

    let rightGrad = new MatMul(node.left, grad, {name: rightName, transposeLeft: true});
    rightGrad = this.addNode(rightGrad);

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitMaxPool(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.image.name;
    console.log(gradName);

    let imageGrad = ExpressionFactory.createMaxPoolGrad({
      name: gradName,
      image: node.image,
      kernelShape: node.kernelShape,
      grad,
      strideWidth: 2,
      strideHeight: 2
    });

    node.image.accept(this, imageGrad);
  }

  visitMultiply(node, params) {
    let grad = this.getGradient(node, params);

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
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let result = ExpressionFactory.createNegate({name: gradName, base: grad});

    node.base.accept(this, result);
  }

  visitParameter(node, params) {
    let grad = this.getGradient(node, params);
  }

  visitReduceSum(node, params) {
    let grad = this.getGradient(node, params);
    node.base.accept(this, grad);
  }

  visitRelu(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let stepName = gradName + "/step";

    let step = ExpressionFactory.createStep({name: stepName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: step});

    node.base.accept(this, result);
  }

  visitSigmoid(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let sigGradName = gradName + "/sigGrad";

    let sigGrad = ExpressionFactory.createSigmoidGrad({name: sigGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sigGrad});

    node.base.accept(this, result);
  }

  visitSine(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let cosName = gradName + '/cos';
    let cos = ExpressionFactory.createCosine({name: cosName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: cos});

    node.base.accept(this, result);
  }

  visitSoftmax(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let softmaxGrad = ExpressionFactory.createSoftmaxGrad({name: gradName, base: node.base, grad});

    node.base.accept(this, softmaxGrad);
  }

  visitSqrt(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let sqrtGradName = gradName + '/sqrtGrad';
    let sqrtGrad = ExpressionFactory.createSqrtGrad({name: sqrtGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sqrtGrad});

    node.base.accept(this, result);
  }

  visitSquare(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let mulName = gradName + '/mul2';
    let mul = ExpressionFactory.createMultiply({name: mulName, left: node.base, right: Constant.TWO});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: mul});

    node.base.accept(this, result);
  }

  visitSubtract(node, params) {
    let grad = this.getGradient(node, params);

    let rightGradName = node.name + "/grad_" + node.right.name;
    let rightGrad = ExpressionFactory.createNegate({name: rightGradName, base: grad});

    node.left.accept(this, grad);
    node.right.accept(this, rightGrad);
  }

  visitTangent(node, params) {
    let grad = this.getGradient(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let sigGradName = gradName + "/sigGrad";

    let sigGrad = ExpressionFactory.createTanGrad({name: sigGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sigGrad});

    node.base.accept(this, result);
  }

  visitVariable(node, params) {
    let grad = this.getGradient(node, params);
  }
}