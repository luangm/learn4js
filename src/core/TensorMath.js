import Tensor from "./Tensor";
import Executor from "./executor/Executor";
import SigmoidOp from "./op/transform/SigmoidOp";
import SquareOp from "./op/transform/SquareOp";

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
}