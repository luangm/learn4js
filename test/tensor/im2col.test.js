import TensorUtils from "../../src/core/util/TensorUtils";
import {println, Tensor} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('im2col', function() {
  let a = Tensor.linspace(1, 9, 9).reshape([1, 3, 3]); // C, H, W
  let kernel = Tensor.linspace(1, 4, 4).reshape([1, 1, 2, 2]); // N C H W

  // println(a);
  // println(kernel);

  let xCol = TensorUtils.im2col(a, kernel);
  // println(xCol);

  let kCol = kernel.reshape([1, 4]);
  // println(kCol);

  let result = TensorMath.matmul(kCol, xCol);
  // println(result);

  let reshaped = result.reshape([1, 2, 2]);
  println(reshaped);

  let conv2d = TensorMath.conv2d(a, kernel);
  println(conv2d);
});