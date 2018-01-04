import {Tensor} from '../../src/index.js';
import TensorUtils from "../../src/core/util/TensorUtils";

test('conv2d', function() {
  let image = Tensor.linspace(1, 9, 9).reshape([1, 3, 3]);
  let kernel = Tensor.create([1, 2, 3, 4]).reshape([2, 2]);

  let result = TensorUtils.im2col(image, kernel);
  console.log(result);
});
