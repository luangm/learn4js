import {println, parameter, gradients} from '../../src/index';

test('divideGrad', function() {

  // Learn4js.interactive = true;

  let x = parameter([[1, 2, 3], [4, 5, 6]]);
  let y = parameter([[2, 3, 4], [5, 6, 7]]);
  let result = x.divide(y);

  let grads = gradients(result, [x, y]);

  let x_grad = grads[0];
  let y_grad = grads[1];

  println(x_grad);
  println(y_grad);
});