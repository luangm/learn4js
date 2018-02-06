import Learn4js, {println} from '../../src/index';

test('divideGrad', function() {
  Learn4js.interactive = true;

  let x = Learn4js.parameter([[1, 2, 3], [4, 5, 6]]);
  let y = Learn4js.parameter([[2, 3, 4], [5, 6, 7]]);
  let result = Learn4js.divide(x, y);
  println(result);

  let grads = Learn4js.gradients(result, [x, y]);

  let x_grad = grads[0];
  let y_grad = grads[1];

  println(x_grad);
  println(y_grad);
});