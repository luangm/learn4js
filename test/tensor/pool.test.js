import {Tensor} from '../../src/index.js';
import TensorUtils from "../../src/core/util/TensorUtils";
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('maxpool', function() {
  let image = Tensor.linspace(1, 16, 16).reshape([1, 1, 4, 4]); // N, C, H, W
  let kernel = Tensor.linspace(1, 4, 4).reshape([1, 1, 2, 2]); // N C H W
  let xCol = TensorUtils.im2col(image, kernel, {strideWidth: 2, strideHeight: 2});
  println(xCol);

  let max = TensorMath.reduceMax(xCol, 0);
  println(max);
});

test('argmax', function() {
  let image = Tensor.linspace(1, 6, 6).reshape([2, 3]); // N, C, H, W
  let argmax = TensorMath.argMax(image, 0);
  println(argmax);

  let argmax1 = TensorMath.argMax(image, 1);
  println(argmax1);
});