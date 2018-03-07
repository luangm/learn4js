import Tensor from "../core/Tensor";
import ShapeUtils from "../core/util/ShapeUtils";
import TensorUtils from "../core/util/TensorUtils";
import ExpressionFactory from "../structure/factory/ExpressionFactory";
import Fill from "../structure/node/Fill";
import Logger from "../util/Logger";
import Visitor from "./Visitor";

let logger = new Logger("ReverseGradientVisitor");

/**
 * The Reverse Gradient Visitor visit a Graph from a single node (Source),
 * Then create a GradientGraph as a result.
 *
 * The nodes of the GradientGraph is the gradient of the Source node wrt. each Node from the original Graph
 */
export default class ReverseGradientVisitor extends Visitor {

  constructor(graph) {
    super();
    this._graph = graph;
    this._gradMap = {}; // Key = target.id, value = list of grads
  }

  get factory() {
    return this.graph.expressionFactory;
  }

  get graph() {
    return this._graph;
  }

  /**
   * Called before each method
   */
  preVisit(node, params) {
    let grad = params || new Fill(1, node.shape);
    grad = this.graph.add(grad);
    this._addGradient(node, grad);
    return grad;
  }

  /**
   * This method starts the entire visiting pattern from the source
   */
  visit(source) {
    this._source = source;
    this._gradMap = {}; // Resets the grad map
    source.accept(this);
    this._finalize();
  }

  // DONE
  visitAbsolute(node, params) {
    logger.info("visitAbsolute", node.id);
    let grad = this.preVisit(node, params);
    let sign = this.factory.sign(node.base);
    let result = this.factory.multiply(grad, sign);
    node.base.accept(this, result);
  }

  // DONE
  visitAdd(node, params) {
    logger.info("visitAdd", node.id);
    let grad = this.preVisit(node, params);
    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);
    let leftGrad = this.factory.reduceSum(grad, pair.left);
    let rightGrad = this.factory.reduceSum(grad, pair.right);
    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  // DONE
  visitAddN(node, params) {
    logger.info("visitAddN", node.id);
    let grad = this.preVisit(node, params);
    for (let item of node.list) {
      item.accept(this, grad);
    }
  }

  // DONE
  visitConstant(node, params) {
    logger.info("visitConstant", node.id);
    this.preVisit(node, params);
  }

  visitConv2d(node, params) {
    logger.info("visitConv2d", node.id);
    let grad = this.preVisit(node, params);

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

  // DONE
  visitCosine(node, params) {
    logger.info("visitCosine", node.id);
    let grad = this.preVisit(node, params);
    let sine = this.factory.sin(node.base);
    let neg = this.factory.negate(sine);
    let result = this.factory.multiply(grad, neg);
    node.base.accept(this, result);
  }

  // DONE
  visitDivide(node, params) {
    logger.info("visitDivide", node.id);
    let grad = this.preVisit(node, params);
    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);

    // left = grad / right
    // right = -grad * left / right^2
    let leftDiv = this.factory.divide(grad, node.right);
    let rightDiv = this.factory.divide(leftDiv, node.right);
    let rightMul = this.factory.multiply(node.left, rightDiv);
    let rightNeg = this.factory.negate(rightMul);

    let leftGrad = this.factory.reduceSum(leftDiv, pair.left);
    let rightGrad = this.factory.reduceSum(rightNeg, pair.right);

    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  // DONE
  visitExp(node, params) {
    logger.info("visitExp", node.id);
    let grad = this.preVisit(node, params);
    let result = this.factory.multiply(grad, node);
    node.base.accept(this, result);
  }

  // DONE
  visitLog(node, params) {
    logger.info("visitLog", node.id);
    let grad = this.preVisit(node, params);
    let result = this.factory.divide(grad, node.base);
    node.base.accept(this, result);
  }

  // DONE
  visitMatMul(node, params) {
    logger.info("visitMatMul", node.id);
    let grad = this.preVisit(node, params);
    let leftGrad = this.factory.matmul(grad, node.right, false, true);
    let rightGrad = this.factory.matmul(node.left, grad, true, false);
    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  visitMaxPool(node, params) {
    logger.info("visitMaxPool", node.id);
    let grad = this.preVisit(node, params);

    let gradName = node.name + "/grad_" + node.image.name;
    logger.info(gradName);

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

  // DONE
  visitMultiply(node, params) {
    logger.info("visitMultiply", node.id);
    let grad = this.preVisit(node, params);
    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);
    let leftMul = this.factory.multiply(grad, node.right);
    let rightMul = this.factory.multiply(node.left, grad);
    let leftGrad = this.factory.reduceSum(leftMul, pair.left);
    let rightGrad = this.factory.reduceSum(rightMul, pair.right);
    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGrad);
  }

  // DONE
  visitNegate(node, params) {
    logger.info("visitNegate", node.id);
    let grad = this.preVisit(node, params);
    let result = this.factory.negate(grad);
    node.base.accept(this, result);
  }

  // DONE
  visitParameter(node, params) {
    logger.info("visitParameter", node.id);
    this.preVisit(node, params);
  }

  // TODO: Fix
  visitReduceSum(node, params) {
    logger.info("visitReduceSum", node.id);
    let grad = this.preVisit(node, params);
    let result = this._getReductionGrad(node, grad);
    node.base.accept(this, result);
  }

  // DONE
  visitRelu(node, params) {
    logger.info("visitRelu", node.id);
    let grad = this.preVisit(node, params);
    let step = this.factory.step(node.base);
    let result = this.factory.multiply(grad, step);
    node.base.accept(this, result);
  }

  // DONE
  visitSigmoid(node, params) {
    logger.info("visitSigmoid", node.id);
    let grad = this.preVisit(node, params);
    let sigGrad = this.factory.sigmoidGrad(node.base);
    let result = this.factory.multiply(grad, sigGrad);
    node.base.accept(this, result);
  }

  // DONE
  visitSine(node, params) {
    logger.info("visitSine", node.id);
    let grad = this.preVisit(node, params);
    let cos = this.factory.cos(node.base);
    let result = this.factory.multiply(grad, cos);
    node.base.accept(this, result);
  }

  // DONE
  visitSoftmax(node, params) {
    logger.info("visitSoftmax", node.id);
    let grad = this.preVisit(node, params);
    let softmaxGrad = this.factory.softmaxGrad(node.base, grad);
    node.base.accept(this, softmaxGrad);
  }

  // DONE
  visitSoftmaxCrossEntropy(node, params) {
    logger.info("visitSoftmaxCrossEntropy", node.id);
    let grad = this.preVisit(node, params);
    let softmax = this.factory.softmax(node.logits);
    let subtract = this.factory.subtract(softmax, node.labels);
    let result = this.factory.multiply(grad, subtract);
    node.logits.accept(this, result);
  }

  visitSqrt(node, params) {
    logger.info("visitSqrt", node.id);
    let grad = this.preVisit(node, params);

    let gradName = node.name + "/grad_" + node.base.name;
    let sqrtGradName = gradName + '/sqrtGrad';
    let sqrtGrad = ExpressionFactory.createSqrtGrad({name: sqrtGradName, base: node.base});
    let result = ExpressionFactory.createMultiply({name: gradName, left: grad, right: sqrtGrad});

    node.base.accept(this, result);
  }

  // DONE
  visitSquare(node, params) {
    logger.info("visitSquare", node.id);
    let grad = this.preVisit(node, params);
    let two = this.factory.constant(Tensor.scalar(2), {name: 'TWO'});
    let mul = this.factory.multiply(two, node.base);
    let result = this.factory.multiply(grad, mul);
    node.base.accept(this, result);
  }

  // DONE
  visitSubtract(node, params) {
    logger.info("visitSubtract", node.id);
    let grad = this.preVisit(node, params);
    let pair = TensorUtils.getReductionIndices(node.left.shape, node.right.shape);
    let leftGrad = this.factory.reduceSum(grad, pair.left);
    let rightGrad = this.factory.reduceSum(grad, pair.right);
    let rightGradNeg = this.factory.negate(rightGrad);
    node.left.accept(this, leftGrad);
    node.right.accept(this, rightGradNeg);
  }

  // DONE
  visitTangent(node, params) {
    logger.info("visitTangent", node.id);
    let grad = this.preVisit(node, params);
    let sigGrad = this.factory.tanGrad(node.base);
    let result = this.factory.multiply(grad, sigGrad);
    node.base.accept(this, result);
  }

  // DONE
  visitVariable(node, params) {
    logger.info("visitVariable", node.id);
    this.preVisit(node, params);
  }

  _addGradient(target, grad) {
    let list = this._gradMap[target.id];
    if (!list) {
      list = [];
      this._gradMap[target.id] = list;
    }
    list.push(grad);
  }

  /**
   * This method is called after all nodes are visited
   */
  _finalize() {
    for (let key in this._gradMap) {
      let grads = this._gradMap[key];
      if (grads.length === 1) {
        this._source.setGradient(key, grads[0]);
      } else {
        let addN = this.factory.addN(grads);
        this._source.setGradient(key, addN);
      }
    }
  }

  _getReductionGrad(node, grad) {
    let inputShape = node.base.shape;
    let outputShape = node.shape;
    let scale = ShapeUtils.safeDivide(inputShape, outputShape);
    return this.factory.tile(grad, scale);
  }
}