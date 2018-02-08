import Tensor from "../core/Tensor";
import TensorMath from "../core/util/TensorMath";
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
    return this._valueMap[node.id];
  }

  setValue(node, value) {
    this._valueMap[node.id] = value;
  }

  // DONE
  visitAbsolute(node, params) {
    logger.info("visitAbsolute", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.abs(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitAdd(node, params) {
    logger.info("visitAdd", node.id);

    if (node.left.isInvalid) {
      node.left.accept(this, params);
    }

    if (node.right.isInvalid) {
      node.right.accept(this, params);
    }

    let left = node.left.value;
    let right = node.right.value;
    node.value = TensorMath.add(left, right);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
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

  // DONE
  visitAssign(node, params) {
    logger.info("visitAssign", node.id);

    if (node.newValue.isInvalid) {
      node.newValue.accept(this, params);
    }

    node.target.value = node.newValue.value;
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitConstant(node, params) {
    logger.info("visitConstant", node.id);
    this.session.setValue(node, node.value);
    node.state = ExpressionState.EVALUATED;
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

  // DONE
  visitCosine(node, params) {
    logger.info("visitCosine", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.cos(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitDivide(node, params) {
    logger.info("visitDivide", node.id);

    if (node.left.isInvalid) {
      node.left.accept(this, params);
    }

    if (node.right.isInvalid) {
      node.right.accept(this, params);
    }

    let left = node.left.value;
    let right = node.right.value;
    node.value = TensorMath.divide(left, right);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitExp(node, params) {
    logger.info("visitExp", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.exp(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
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

  visitLog(node, params) {
    logger.info("visitLog", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.log(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitMatMul(node, params) {
    logger.info("visitMatMul", node.id);

    if (node.left.isInvalid) {
      node.left.accept(this, params);
    }

    if (node.right.isInvalid) {
      node.right.accept(this, params);
    }

    let left = node.left.value;
    let right = node.right.value;
    node.value = TensorMath.matmul(left, right, node.transposeLeft, node.transposeRight);
    node.state = ExpressionState.EVALUATED;
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

  // DONE
  visitMultiply(node, params) {
    logger.info("visitMultiply", node.id);

    if (node.left.isInvalid) {
      node.left.accept(this, params);
    }

    if (node.right.isInvalid) {
      node.right.accept(this, params);
    }

    let left = node.left.value;
    let right = node.right.value;
    node.value = TensorMath.multiply(left, right);
    node.state = ExpressionState.EVALUATED;
  }

  visitNegate(node, params) {
    logger.info("visitNegate", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.negate(base);
    node.state = ExpressionState.EVALUATED;
  }

  visitParameter(node, params) {
    logger.info("visitParameter", node.id);
    this.session.setValue(node, node.value);
    node.state = ExpressionState.EVALUATED;
  }

  visitReciprocal(node, params) {
    logger.info("visitReciprocal", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.reciprocal(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitReduceSum(node, params) {
    logger.info("visitRelu", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.reduceSum(base, node.dimension);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitTile(node, params) {
    logger.info("visitTile", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.tile(base, node.repeats);
    node.state = ExpressionState.EVALUATED;
  }


  // DONE
  visitRelu(node, params) {
    logger.info("visitRelu", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.relu(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSigmoid(node, params) {
    logger.info("visitSigmoid", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.sigmoid(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSigmoidGrad(node, params) {
    logger.info("visitSigmoidGrad", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.sigmoidGrad(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSign(node, params) {
    logger.info("visitSign", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.sign(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSine(node, params) {
    logger.info("visitSine", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.sin(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSoftmax(node, params) {
    logger.info("visitSoftmax", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.softmax(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
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

  // DONE
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

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.sqrt(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSqrtGrad(node, params) {
    logger.info("visitSqrtGrad", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.sqrtGrad(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSquare(node, params) {
    logger.info("visitSquare", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.square(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitStep(node, params) {
    logger.info("visitStep", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.step(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitSubtract(node, params) {
    logger.info("visitSubtract", node.id);

    if (node.left.isInvalid) {
      node.left.accept(this, params);
    }

    if (node.right.isInvalid) {
      node.right.accept(this, params);
    }

    let left = node.left.value;
    let right = node.right.value;
    node.value = TensorMath.subtract(left, right);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitTangent(node, params) {
    logger.info("visitTangent", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.tan(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitTangentGrad(node, params) {
    logger.info("visitTangentGrad", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.tanGrad(base);
    node.state = ExpressionState.EVALUATED;
  }

  // DONE
  visitTanh(node, params) {
    logger.info("visitTanh", node.id);

    if (node.base.isInvalid) {
      node.base.accept(this, params);
    }

    let base = node.base.value;
    node.value = TensorMath.tanh(base);
    node.state = ExpressionState.EVALUATED;
  }

  visitVariable(node, params) {
    logger.info("visitVariable", node.id);
    // super.visitVariable(node, params);
    node.state = ExpressionState.EVALUATED;
  }
}