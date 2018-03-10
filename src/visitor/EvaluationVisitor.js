import Tensor from "../core/Tensor";
import TensorMath from "../core/TensorMath";
import TensorUtils from "../core/util/TensorUtils";
import ExpressionState from "../structure/constant/ExpressionState";
import Logger from "../util/Logger";
import Visitor from "./Visitor";

let logger = new Logger("EvaluationVisitor");

export default class EvaluationVisitor extends Visitor {

  constructor(session) {
    super();
    this._session = session;
  }

  get session() {
    return this._session;
  }

  getValue(node) {
    return this.session.getValue(node);
  }

  setValue(node, value) {
    this.session.setValue(node, value);
  }

  // Done
  visitAbsolute(node, params) {
    logger.info("visitAbsolute", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.abs(base);
    this.setValue(node, result);
  }

  // Done
  visitAdd(node, params) {
    logger.info("visitAdd", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.left.accept(this, params);
    node.right.accept(this, params);
    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.add(left, right);
    this.setValue(node, result);
  }

  visitAddN(node, params) {
    logger.info("visitAddN", node.id);

    for (let item of node.list) {
      if (item.isInvalid) {
        item.accept(this, params);
      }
    }

    let items = node.list.map(x => x.value);
    node.value = TensorMath.addN(items);
    node.state = ExpressionState.EVALUATED;
  }

  visitAssign(node, params) {
    logger.info("visitAssign", node.id);

    if (node.newValue.isInvalid) {
      node.newValue.accept(this, params);
    }

    node.target.value = node.newValue.value;
    node.state = ExpressionState.EVALUATED;
  }

  visitConstant(node, params) {
    logger.info("visitConstant", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    this.setValue(node, node.value);
  }

  visitConv2d(node, params) {
    super.visitConv2d(node, params);
    let image = this.valueMap[node.image.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorMath.conv2d(image, kernel);
  }

  visitConv2dImageGrad(node, params) {
    super.visitConv2dImageGrad(node, params);
    let image = this.valueMap[node.image.id];
    let grad = this.valueMap[node.grad.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorMath.conv2dImageGrad(image, kernel, grad);
  }

  visitConv2dKernelGrad(node, params) {
    super.visitConv2dKernelGrad(node, params);
    let image = this.valueMap[node.image.id];
    let grad = this.valueMap[node.grad.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorMath.conv2dKernelGrad(image, kernel, grad);
  }

  // Done
  visitCosine(node, params) {
    logger.info("visitCosine", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.cos(base);
    this.setValue(node, result);
  }

  // DONE
  visitDivide(node, params) {
    logger.info("visitDivide", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.left.accept(this, params);
    node.right.accept(this, params);

    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.divide(left, right);
    this.setValue(node, result);
  }

  // DONE
  visitExp(node, params) {
    logger.info("visitExp", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.exp(base);
    this.setValue(node, result);
  }

  // DONE
  visitExpm1(node, params) {
    logger.info("visitExpm1", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.expm1(base);
    this.setValue(node, result);
  }

  visitFill(node, params) {
    super.visitFill(node, params);

    if (!this.session.getValue(node)) {
      let tensor = new Tensor({shape: node.shape});
      tensor = TensorMath.set(tensor, node.scalar);
      this.session.setValue(node, tensor);
    }

    node.state = ExpressionState.EVALUATED;
  }

  visitGradientDescentStep(node, params) {
    super.visitGradientDescentStep(node, params);

    let grad = this.valueMap[node.grad.id];
    let target = this.valueMap[node.target.id];
    let newValue = TensorMath.gradientDescentStep(target, grad, node.learnRate);
    node.target.value = newValue;
    this.valueMap[node.id] = newValue;
    this.valueMap[node.target.id] = newValue;
  }

  visitIm2Col(node, params) {
    super.visitIm2Col(node, params);
    let image = this.valueMap[node.image.id];
    let kernel = this.valueMap[node.kernel.id];
    this.valueMap[node.id] = TensorUtils.im2col(image, kernel);
  }

  // DONE
  visitLog(node, params) {
    logger.info("visitLog", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.log(base);
    this.setValue(node, result);
  }

  // DONE
  visitLog1p(node, params) {
    logger.info("visitLog1p", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.log1p(base);
    this.setValue(node, result);
  }

  // DONE
  visitMatMul(node, params) {
    logger.info("visitMatMul", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.left.accept(this, params);
    node.right.accept(this, params);
    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.matmul(left, right, node.transposeLeft, node.transposeRight);
    this.setValue(node, result);
  }

  visitMaxPool(node, params) {
    super.visitMaxPool(node, params);
    let image = this.valueMap[node.image.id];
    let kernelShape = node.kernelShape;
    this.valueMap[node.id] = TensorMath.maxPool(image, kernelShape, 2, 2);
  }

  visitMaxPoolGrad(node, params) {
    super.visitMaxPoolGrad(node, params);
    let image = this.valueMap[node.image.id];
    let grad = this.valueMap[node.grad.id];
    let kernelShape = node.kernelShape;
    let kernel = new Tensor({shape: kernelShape});
    this.valueMap[node.id] = TensorMath.maxPoolGrad(image, kernel, grad, {strideWidth: 2, strideHeight: 2});
  }

  // Done
  visitMaximum(node, params) {
    logger.info("visitMaximum", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.left.accept(this, params);
    node.right.accept(this, params);
    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.max(left, right);
    this.setValue(node, result);
  }

  // Done
  visitMinimum(node, params) {
    logger.info("visitMinimum", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.left.accept(this, params);
    node.right.accept(this, params);
    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.min(left, right);
    this.setValue(node, result);
  }

  // DONE
  visitModulo(node, params) {
    logger.info("visitModulo", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.left.accept(this, params);
    node.right.accept(this, params);

    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.mod(left, right);
    this.setValue(node, result);
  }

  // DONE
  visitMultiply(node, params) {
    logger.info("visitMultiply", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.left.accept(this, params);
    node.right.accept(this, params);
    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.multiply(left, right);
    this.setValue(node, result);
  }

  // DONE
  visitNegate(node, params) {
    logger.info("visitNegate", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.negate(base);
    this.setValue(node, result);
  }

  // DONE
  visitParameter(node, params) {
    logger.info("visitParameter", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    this.setValue(node, node.initialValue);
  }

  // DONE
  visitRSqrt(node, params) {
    logger.info("visitRSqrt", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.rsqrt(base);
    this.setValue(node, result);
  }

  // DONE
  visitReciprocal(node, params) {
    logger.info("visitReciprocal", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.reciprocal(base);
    this.setValue(node, result);
  }

  visitReduceSum(node, params) {
    logger.info("visitReduceSum", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.reduceSum(base, node.dimension);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitRelu(node, params) {
    logger.info("visitRelu", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.relu(base);
    this.setValue(node, result);
  }

  // DONE
  visitRound(node, params) {
    logger.info("visitRound", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.round(base);
    this.setValue(node, result);
  }

  // DONE
  visitSigmoid(node, params) {
    logger.info("visitSigmoid", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.sigmoid(base);
    this.setValue(node, result);
  }

  // DONE
  visitSigmoidGrad(node, params) {
    logger.info("visitSigmoidGrad", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.sigmoidGrad(base);
    this.setValue(node, result);
  }

  // DONE
  visitSign(node, params) {
    logger.info("visitSign", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.sign(base);
    this.setValue(node, result);
  }

  // DONE
  visitSine(node, params) {
    logger.info("visitSine", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.sin(base);
    this.setValue(node, result);
  }

  // DONE
  visitSoftmax(node, params) {
    logger.info("visitSoftmax", node.id);
    if (this.session.isValid(node)) {
      return;
    }

    node.base.accept(this, params);

    let base = this.getValue(node.base);
    let result = TensorMath.softmax2(base);
    this.setValue(node, result);
  }


  visitSoftmaxCrossEntropy(node, params) {
    logger.info("visitSoftmaxCrossEntropy", node.id);

    if (node.logits.isInvalid) {
      node.logits.accept(this, params);
    }

    let labels = node.labels.value;
    let logits = node.logits.value;
    node.value = TensorMath.softmaxCrossEntropyWithLogits(labels, logits);
    node.state = ExpressionState.EVALUATED;
  }


  visitSoftmaxGrad(node, params) {
    logger.info("visitSoftmaxGrad", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    let grad = node.grad.value;
    node.value = TensorMath.softmaxGrad(base, grad);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSqrt(node, params) {
    logger.info("visitSqrt", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.sqrt(base);
    this.setValue(node, result);
  }

  // DONE
  visitSqrtGrad(node, params) {
    logger.info("visitSqrtGrad", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.sqrtGrad(base);
    this.setValue(node, result);
  }

  // DONE
  visitSquare(node, params) {
    logger.info("visitSquare", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.square(base);
    this.setValue(node, result);
  }

  // DONE
  visitStep(node, params) {
    logger.info("visitStep", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.step(base);
    this.setValue(node, result);
  }

  // DONE
  visitSubtract(node, params) {
    logger.info("visitSubtract", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.left.accept(this, params);
    node.right.accept(this, params);
    let left = this.getValue(node.left);
    let right = this.getValue(node.right);
    let result = TensorMath.subtract(left, right);
    this.setValue(node, result);
  }

  // DONE
  visitTangent(node, params) {
    logger.info("visitTangent", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.tan(base);
    this.setValue(node, result);
  }

  // DONE
  visitTangentGrad(node, params) {
    logger.info("visitTangentGrad", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.tanGrad(base);
    this.setValue(node, result);
  }

  // DONE
  visitTanh(node, params) {
    logger.info("visitTanh", node.id);
    if (this.session.isValid(node)) {
      return;
    }
    node.base.accept(this, params);
    let base = this.getValue(node.base);
    let result = TensorMath.tanh(base);
    this.setValue(node, result);
  }


  visitTile(node, params) {
    logger.info("visitTile", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.tile(base, node.repeats);
    node.state = ExpressionState.EVALUATED;
  }

  visitVariable(node, params) {
    logger.info("visitVariable", node.id);
    // super.visitVariable(node, params);
    node.state = ExpressionState.EVALUATED;
  }
}