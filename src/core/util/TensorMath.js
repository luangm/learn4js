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

export default class TensorMath {

  static add(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor(resultShape);
    Executor.instance.exec(new AddOp(left, right, result));
    return result;
  }

  static divide(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor(resultShape);
    Executor.instance.exec(new DivideOp(left, right, result));
    return result;
  }

  static matmul(left, right) {
    let result = new Tensor([left.shape[0], right.shape[1]]);
    Executor.instance.exec(new MatMulOp(left, right, result));
    return result;
  }

  static multiply(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor(resultShape);
    let newLeft = left.broadcast(resultShape);
    let newRight = right.broadcast(resultShape);
    Executor.instance.exec(new MultiplyOp(newLeft, newRight, result));
    return result;
  }

  static negate(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new NegateOp(base, null, result));
    return result;
  }

  static set(base, scalar) {
    Executor.instance.exec(new SetOp(base, scalar, base));
    return base;
  }

  static sigmoid(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new SigmoidOp(base, null, result));
    return result;
  }

  static sigmoidGrad(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new SigmoidGradOp(base, null, result));
    return result;
  }

  static square(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new SquareOp(base, null, result));
    return result;
  }

  static subtract(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor(resultShape);
    Executor.instance.exec(new SubtractOp(left, right, result));
    return result;
  }
}