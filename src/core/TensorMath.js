import Tensor from "./Tensor";
import Executor from "./executor/Executor";
import SigmoidOp from "./op/transform/SigmoidOp";
import SquareOp from "./op/transform/SquareOp";
import SetOp from "./op/transform/SetOp";

export default class TensorMath {

  static sigmoid(input) {
    let result = new Tensor(input.shape);
    Executor.instance.exec(new SigmoidOp(input, null, result));
    return result;
  }

  static square(input) {
    let result = new Tensor(input.shape);
    Executor.instance.exec(new SquareOp(input, null, result));
    return result;
  }

  static set(input, scalar) {
    console.log(input, scalar);
    Executor.instance.exec(new SetOp(input, scalar, input));
    return input;
  }
}