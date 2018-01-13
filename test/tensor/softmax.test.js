import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('softmax', function() {
  let logits = Tensor.create([[1, 2, 3, 4], [5, 6, 7, 8]]);
  let yTrue = Tensor.create([[0, 0, 0, 1], [1, 0, 0, 0]]);

  let result = TensorMath.softmaxCrossEntropyWithLogits(logits, yTrue);
  println(result);
  console.log(result);

  let num = Tensor.create([[0.0320586, 0.08714432, 0.23688281, 0.64391422], [0.0320586, 0.08714432, 0.23688281, 0.64391422]]);
  let sum = TensorMath.reduceSum(num, 1);
  println(num);
  println(sum);
});