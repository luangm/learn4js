import Tensor from "./Tensor";
import Executor from "./executor/Executor";
import SigmoidOp from "./op/transform/SigmoidOp";
import SquareOp from "./op/transform/SquareOp";
import SetOp from "./op/transform/SetOp";
import TensorUtils from "./util/TensorUtils";
import AddOp from "./op/pairwise/AddOp";
import NegateOp from "./op/transform/NegateOp";

export default class TensorMath {

  static sigmoid(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new SigmoidOp(base, null, result));
    return result;
  }

  static square(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new SquareOp(base, null, result));
    return result;
  }

  static set(base, scalar) {
    console.log(base, scalar);
    Executor.instance.exec(new SetOp(base, scalar, base));
    return base;
  }

  static add(left, right) {
    let resultShape = TensorUtils.broadcastShapes(left.shape, right.shape);
    let result = new Tensor(resultShape);
    Executor.instance.exec(new AddOp(left, right, result));
    return result;
  }

  static negate(base) {
    let result = new Tensor(base.shape);
    Executor.instance.exec(new NegateOp(base, null, result));
    return result;
  }

}