import Visitor from "./Visitor";
import Fill from "../structure/node/Fill";
import ExpressionFactory from "../structure/factory/ExpressionFactory";
import Constant from "../structure/node/Constant";
import TensorUtils from "../core/util/TensorUtils";
import MatMul from "../structure/node/MatMul";
import ReduceSum from "../structure/node/ReduceSum";
import SigmoidGrad from "../structure/node/SigmoidGrad";
import Multiply from "../structure/node/Multiply";
import Negate from "../structure/node/Negate";
import Softmax from "../structure/node/Softmax";
import Subtract from "../structure/node/Subtract";

/**
 * The Reverse Gradient Visitor visit a ComputeGraph from a single node (Source),
 * Then create a GradientGraph as a result.
 *
 * The nodes of the GradientGraph is the gradient of the Source node wrt. each Node from the original ComputeGraph
 */
export default class ReverseGradientVisitor extends Visitor {

  /**
   * The source is where the reverse gradient starts.
   */
  constructor(graph, source) {
    super();
    this._graph = graph;
    this._source = source;
  }

  get graph() {
    return this._graph;
  }

  get source() {
    return this._source;
  }

  /**
   * Use this method for adding intermediate nodes to the graph.
   */
  add(node) {
    return this.graph.add(node);
  }

  /**
   * This method returns the gradient value of the current node.
   */
  getGradient(node, params) {
    let grad = params || new Fill(1, node.shape);
    return this.graph.add(grad);
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
    this.source.addGradient(node, grad);

    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);

    let leftGrad = pair.left >= 0 ? this.add(new ReduceSum(grad, {reduceDim: pair.left})) : grad;
    let rightGrad = pair.right >= 0 ? this.add(new ReduceSum(grad, {reduceDim: pair.right})) : grad;

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitConstant(node, params) {
    let grad = this.getGradient(node, params);
    this.source.addGradient(node, grad);
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
    this.source.addGradient(node, grad);

    let leftGrad = this.add(new MatMul(grad, node.right, {transposeRight: true}));
    let rightGrad = this.add(new MatMul(node.left, grad, {transposeLeft: true}));

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
    this.source.addGradient(node, grad);

    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);

    let leftMul = this.add(new Multiply(grad, node.right));
    let rightMul = this.add(new Multiply(node.left, grad));

    let leftGrad = pair.left >= 0 ? this.add(new ReduceSum(leftMul, {reduceDim: pair.left})) : leftMul;
    let rightGrad = pair.right >= 0 ? this.add(new ReduceSum(rightMul, {reduceDim: pair.right})) : rightMul;

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitNegate(node, params) {
    let grad = this.getGradient(node, params);
    this.source.addGradient(node, grad);

    let result = this.add(new Negate(grad));

    node.base.accept(this, result);
  }

  visitParameter(node, params) {
    let grad = this.getGradient(node, params);
    this.source.addGradient(node, grad);
  }

  visitReduceSum(node, params) {
    let grad = this.getGradient(node, params);
    this.source.addGradient(node, grad);

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
    this.source.addGradient(node, grad);

    let sigGrad = this.add(new SigmoidGrad(grad));
    let result = this.add(new Multiply(grad, sigGrad));

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

  visitSoftmaxCrossEntropy(node, params) {
    let grad = this.getGradient(node, params);
    this.source.addGradient(node, grad);

    let softmax = this.add(new Softmax(node.logits));
    let subtract = this.add(new Subtract(softmax, node.labels));
    let result = this.add(new Multiply(grad, subtract));

    node.logits.accept(this, result);
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
    this.source.addGradient(node, grad);

    let two = this.add(Constant.TWO);
    let mul = this.add(new Multiply(two, node.base));
    let result = this.add(new Multiply(grad, mul));

    node.base.accept(this, result);
  }

  visitSubtract(node, params) {
    let grad = this.getGradient(node, params);
    this.source.addGradient(node, grad);

    let rightGrad = this.add(new Negate(grad));

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
    this.source.addGradient(node, grad);
  }
}