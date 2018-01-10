import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('softmax', function() {
  let logits = Tensor.linspace(1, 16, 16);
  let result = TensorMath.softmax(logits);
  println(result);
});