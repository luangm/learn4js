import Tensor from "../Tensor";
import Executor from "../executor/Executor";
import RandomOp from "../op/transform/RandomOp";

export default class TensorFactory {
  static ones(shape) {
    return new Tensor({shape}).fill(1);
  }

  static rand(shape) {
    let tensor = new Tensor({shape});
    Executor.instance.exec(new RandomOp(tensor, null, tensor));
    return tensor;
  }

  static zeros(shape) {
    return new Tensor({shape});
  }
}