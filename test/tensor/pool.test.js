import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";
import TensorMath from "../../src/core/util/TensorMath";

test('maxpool', function() {
  let image = Tensor.linspace(1, 32, 32).reshape([2, 1, 4, 4]); // N, C, H, W
  let kernel = Tensor.linspace(1, 4, 4).reshape([1, 1, 2, 2]); // N C H W

  let result = TensorMath.maxPool(image, kernel.shape, 2, 2);
  println(result);
});

test('argmax', function() {
  let image = Tensor.linspace(1, 6, 6).reshape([2, 3]); // N, C, H, W
  let argmax = TensorMath.argMax(image, 0);
  println(argmax);

  let argmax1 = TensorMath.argMax(image, 1);
  println(argmax1);
});

test('maxpoolgrad', function() {
  let image = Tensor.linspace(1, 32, 32).reshape([2, 1, 4, 4]); // N, C, H, W
  let kernel = Tensor.linspace(1, 4, 4).reshape([1, 1, 2, 2]); // N C H W
  let maxpool = TensorMath.maxPool(image, kernel.shape, 2, 2);
  let grad = Tensor.ones(maxpool.shape).reshape([maxpool.length]);

  let maxPoolGrad = TensorMath.maxPoolGrad(image, kernel, grad, {strideWidth: 2, strideHeight: 2});
  println(maxPoolGrad);
});