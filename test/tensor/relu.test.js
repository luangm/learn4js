import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";
import TensorMath from "../../src/core/TensorMath";

test('relu', function() {
  let image = Tensor.rand([1, 1, 4, 4]);
  let b = image.subtract(Tensor.create(0.5));
  println(b);
  let relued = TensorMath.relu(b);
  println(relued);

  let step = TensorMath.step(b);
  println(step);
});