import Tensor from "../Tensor";
import Executor from "../executor/Executor";
import SigmoidOp from "../op/transform/SigmoidOp";
import SquareOp from "../op/transform/SquareOp";
import SetOp from "../op/transform/SetOp";
import TensorUtils from "../util/TensorUtils";
import AddOp from "../op/pairwise/AddOp";
import NegateOp from "../op/transform/NegateOp";
import MultiplyOp from "../op/pairwise/MultiplyOp";
import DivideOp from "../op/pairwise/DivideOp";
import MatMulOp from "../op/special/MatMulOp";
import SubtractOp from "../op/pairwise/SubtractOp";
import SigmoidGradOp from "../op/transform/SigmoidGradOp";
import SumOp from "../op/reduction/SumOp";
import MaxOp from "../op/reduction/MaxOp";
import ReluOp from "../op/transform/ReluOp";
import StepOp from "../op/transform/StepOp";
import ExpOp from "../op/transform/ExpOp";
import LogOp from "../op/transform/LogOp";
import AbsOp from "../op/transform/AbsOp";
import SineOp from "../op/transform/SineOp";
import CosineOp from "../op/transform/CosineOp";
import SignOp from "../op/transform/SignOp";
import TanOp from "../op/transform/TanOp";
import TanhOp from "../op/transform/TanhOp";
import TanGradOp from "../op/transform/TanGradOp";
import SqrtGradOp from "../op/transform/SqrtGradOp";
import SqrtOp from "../op/transform/SqrtOp";
import ReciprocalOp from "../op/transform/ReciprocalOp";
import MaxIndexOp from "../op/index/MaxIndexOp";
import IndexSetOp from "../op/transform/IndexSetOp";
import {println} from "../../index";

export default class TensorMath {

  static abs(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new AbsOp(base, null, result));
    return result;
  }

  static add(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor({shape: resultShape});
    left = left.broadcast(resultShape);
    right = right.broadcast(resultShape);
    Executor.instance.exec(new AddOp(left, right, result));
    return result;
  }

  static addi(left, right) {
    // let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    // let result = new Tensor({shape: resultShape});
    // left = left.broadcast(resultShape);
    // right = right.broadcast(resultShape);
    Executor.instance.exec(new AddOp(left, right, left));
    return left;
  }

  static argSet(source, args, shape, dim) {
    let result = new Tensor({shape: shape});
    let op = new IndexSetOp(source, args, result);
    Executor.instance.execAtDim(op, dim);
    return result;
  }

  static argMax(base, dim) {
    let resultShape = base.shape.slice();
    resultShape[dim] = 1;
    let result = new Tensor({shape: resultShape});
    let op = new MaxIndexOp(base, null, result);
    Executor.instance.execAtDim(op, dim);

    resultShape = base.shape.slice();
    resultShape.splice(dim, 1);

    return result.reshape(resultShape);
  }

  static conv2d(image, kernel) {

    let xCol = TensorUtils.im2col(image, kernel.shape);

    let numImages = image.shape[0];
    let channels = image.shape[1];
    let height = image.shape[2]; // rows
    let width = image.shape[3]; // cols

    let numKernels = kernel.shape[0];
    let kernelChannels = kernel.shape[1];
    let kernelHeight = kernel.shape[2]; // rows
    let kernelWidth = kernel.shape[3]; // cols

    let outputHeight = TensorUtils.computeConv2dOutSize(height, kernelHeight);
    let outputWidth = TensorUtils.computeConv2dOutSize(width, kernelWidth);

    let kCol = kernel.reshape([numKernels, kernelChannels * kernelWidth * kernelHeight]);
    let result = TensorMath.matmul(kCol, xCol);
    let reshaped = result.reshape([numKernels, numImages, outputHeight, outputWidth]);
    let transposed = reshaped.transpose([1, 0, 2, 3]);
    return transposed;
  }

  static conv2dImageGrad(image, kernel, grad) {
    let numKernels = kernel.shape[0];

    let gradReshape = grad.reshape([numKernels, grad.length / numKernels]);
    let kReshape = kernel.reshape([numKernels, kernel.length / numKernels]);
    let col = TensorMath.matmul(kReshape, gradReshape, true, false);

    return TensorUtils.col2im(col, image, kernel).reshape(image.shape);
  }

  static conv2dKernelGrad(image, kernel, grad) {
    let numKernels = kernel.shape[0];
    let xCol = TensorUtils.im2col(image, kernel);
    let gradReshape = grad.reshape([numKernels, grad.length / numKernels]);
    return TensorMath.matmul(gradReshape, xCol, false, true).reshape(kernel.shape);
  }

  static cos(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new CosineOp(base, null, result));
    return result;
  }

  static divide(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor({shape: resultShape});
    Executor.instance.exec(new DivideOp(left, right, result));
    return result;
  }

  static exp(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new ExpOp(base, null, result));
    return result;
  }

  static log(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new LogOp(base, null, result));
    return result;
  }

  static matmul(left, right, transposeA = false, transposeB = false) {

    let shape = [0, 0];
    shape[0] = transposeA ? left.shape[1] : left.shape[0];
    shape[1] = transposeB ? right.shape[0] : right.shape[1];

    let result = new Tensor({shape});
    Executor.instance.exec(new MatMulOp(left, right, result, transposeA, transposeB));
    return result;
  }

  static maxPool(image, kernelShape, strideWidth, strideHeight) {

    let numImages = image.shape[0];
    let channels = image.shape[1];
    let height = image.shape[2]; // rows
    let width = image.shape[3]; // cols

    let numKernels = kernelShape[0];
    let kernelChannels = kernelShape[1];
    let kernelHeight = kernelShape[2]; // rows
    let kernelWidth = kernelShape[3]; // cols

    let outputHeight = TensorUtils.computeConv2dOutSize(height, kernelHeight, 0, strideHeight);
    let outputWidth = TensorUtils.computeConv2dOutSize(width, kernelWidth, 0, strideWidth);

    let xCol = TensorUtils.im2col(image, kernelShape, {strideWidth, strideHeight});
    let max = TensorMath.reduceMax(xCol, 0);
    let result = max.reshape([numImages, channels, outputHeight, outputWidth]);
    return result;
  }

  static multiply(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor({shape: resultShape});
    let newLeft = left.broadcast(resultShape);
    let newRight = right.broadcast(resultShape);
    Executor.instance.exec(new MultiplyOp(newLeft, newRight, result));
    return result;
  }

  static negate(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new NegateOp(base, null, result));
    return result;
  }

  static reciprocal(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new ReciprocalOp(base, null, result));
    return result;
  }

  static reduceMax(base, dim) {
    if (dim === -1) {
      return base.sum();
    }

    let resultShape = base.shape.slice();
    resultShape[dim] = 1;
    let result = new Tensor({shape: resultShape});
    let op = new MaxOp(base, null, result);
    Executor.instance.execAtDim(op, dim);

    resultShape = base.shape.slice();
    resultShape.splice(dim, 1);

    return result.reshape(resultShape);
  }

  static reduceSum(base, dim) {
    if (dim === -1) {
      return base.sum();
    }

    let resultShape = base.shape.slice();
    resultShape[dim] = 1;
    let result = new Tensor({shape: resultShape});
    let op = new SumOp(base, null, result);
    Executor.instance.execAtDim(op, dim);
    return result;
  }

  static relu(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new ReluOp(base, null, result));
    return result;
  }

  static set(base, scalar) {
    Executor.instance.exec(new SetOp(base, scalar, base));
    return base;
  }

  static sigmoid(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SigmoidOp(base, null, result));
    return result;
  }

  static sigmoidGrad(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SigmoidGradOp(base, null, result));
    return result;
  }

  static sign(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SignOp(base, null, result));
    return result;
  }

  static sin(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SineOp(base, null, result));
    return result;
  }

  static softmax(base) {
    let result = new Tensor({shape: base.shape});
    // let exp = TensorMath.exp()
    // Executor.instance.execAtDim(new SoftmaxOp(base, null, result));
    return result;
  }

  static sqrt(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SqrtOp(base, null, result));
    return result;
  }

  static sqrtGrad(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SqrtGradOp(base, null, result));
    return result;
  }

  static square(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SquareOp(base, null, result));
    return result;
  }

  static step(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new StepOp(base, null, result));
    return result;
  }

  static subtract(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    left = left.broadcast(resultShape);
    right = right.broadcast(resultShape);
    let result = new Tensor({shape: resultShape});
    Executor.instance.exec(new SubtractOp(left, right, result));
    return result;
  }

  static tan(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new TanOp(base, null, result));
    return result;
  }

  static tanGrad(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new TanGradOp(base, null, result));
    return result;
  }

  static tanh(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new TanhOp(base, null, result));
    return result;
  }

  static maxPoolGrad(image, kernel, grad, {strideWidth, strideHeight}) {
    let xCol = TensorUtils.im2col(image, kernel.shape, {strideWidth, strideHeight});
    let argmax = TensorMath.argMax(xCol, 0);
    let gradReshape = grad.reshape([1, grad.length]);
    let set = TensorMath.argSet(gradReshape, argmax, xCol.shape, 0);
    let result = TensorUtils.col2im(set, image, kernel, {strideWidth, strideHeight}).reshape(image.shape);
    return result;
  }
}