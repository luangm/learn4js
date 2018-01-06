import {Tensor} from '../../src/index.js';
import TensorUtils from "../../src/core/util/TensorUtils";
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('conv2d', function() {
  let image = Tensor.linspace(1, 54, 54).reshape([2, 3, 3, 3]);
  let kernel = Tensor.linspace(1, 24, 24).reshape([2, 3, 2, 2]);
  let result = TensorMath.conv2d(image, kernel);
  println(result);
});

test('conv2d2', function() {
  let image = Tensor.linspace(1, 27, 27).reshape([3, 1, 3, 3]);
  let kernel = Tensor.linspace(1, 16, 16).reshape([4, 1, 2, 2]);
  let result = TensorMath.conv2d(image, kernel);
  println(result);
  println(result.shape);
});

test('im2col', function() {
  let image = Tensor.linspace(1, 9, 9).reshape([1, 1, 3, 3]); // N, C, H, W
  let kernel = Tensor.linspace(1, 4, 4).reshape([1, 1, 2, 2]); // N C H W
  let xCol = TensorUtils.im2col(image, kernel);
  println(xCol);
});
