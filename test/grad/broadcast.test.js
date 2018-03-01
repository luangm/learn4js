import Learn4js, {println, Tensor} from '../../src/index';

test('broad add', function() {

  let tensorA = Tensor.linspace(1, 3, 3).reshape([1, 3]);
  let tensorB = Tensor.linspace(1, 2, 2).reshape([2, 1]);

  let a = Learn4js.parameter(tensorA);
  let b = Learn4js.parameter(tensorB);
  let add = Learn4js.add(a, b);

  let grads = Learn4js.gradients(add, [a, b]);
  let gradA = grads[0];
  let gradB = grads[1];

  println(gradA.eval());
  println(gradB.eval());
});