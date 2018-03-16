import {Tensor} from "tensor4js";
import {gradients, parameter, println} from '../../src/index';

test('broad add', function() {

  let tensorA = Tensor.linspace(1, 3, 3).reshape([1, 3]);
  let tensorB = Tensor.linspace(1, 2, 2).reshape([2, 1]);

  let a = parameter(tensorA);
  let b = parameter(tensorB);
  let add = a.add(b);
  println(add.value);

  let grads = gradients(add, [a, b]);
  let gradA = grads[0];
  let gradB = grads[1];

  println(gradA.value);
  println(gradB.value);
});