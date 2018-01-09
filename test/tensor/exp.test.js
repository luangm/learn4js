import {Tensor} from '../../src/index.js';
import TensorUtils from "../../src/core/util/TensorUtils";
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('exp', function() {
  let a = Tensor.linspace(1.0, 4.0, 4);
  println(a);

  let result = TensorMath.exp(a);
  println(result);

  console.log(result);
});

test('log', function() {
  let a = Tensor.linspace(1.0, 4.0, 4);
  println(a);

  let result = TensorMath.log(a);
  println(result);

  console.log(result);
});

test('abs', function() {
  let a = Tensor.linspace(-5, 5.0, 4);
  println(a);

  let result = TensorMath.abs(a);
  println(result);

  console.log(result);
});