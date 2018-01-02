import Tensor from "../../src/core/Tensor";
import TensorUtils from "../../src/core/util/TensorUtils";

test('im2col', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], shape: [1, 4, 4]});
  let kernel = new Tensor({data: [1, 2, 3, 4], shape: [2, 2]});

  let result = TensorUtils.im2col(a, kernel, {strideWidth: 2, strideHeight:2});
  console.log(result);
});