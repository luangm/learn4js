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

export default class TensorMath {

  static add(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor({shape: resultShape});
    left = left.broadcast(resultShape);
    right = right.broadcast(resultShape);
    Executor.instance.exec(new AddOp(left, right, result));
    return result;
  }

  static divide(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor({shape: resultShape});
    Executor.instance.exec(new DivideOp(left, right, result));
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

  static square(base) {
    let result = new Tensor({shape: base.shape});
    Executor.instance.exec(new SquareOp(base, null, result));
    return result;
  }

  static subtract(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor({shape: resultShape});
    Executor.instance.exec(new SubtractOp(left, right, result));
    return result;
  }

  static conv2d(image, kernel) {
    let xCol = TensorUtils.im2col(image, kernel);
    let kCol = kernel.reshape([1, kernel.shape[2] * kernel.shape[3]]);
    let result = TensorMath.matmul(kCol, xCol);
    let reshaped = result.reshape([1, 2, 2]);
    return reshaped;
  }
}