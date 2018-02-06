import Learn4js, {println} from '../../src/index';

test('tan', function() {
  Learn4js.interactive = true;

  let x = Learn4js.parameter([[0.1, 2, 0.2], [4, 0.3, 6]]);
  let result = Learn4js.tan(x);
  println(result);

  let grads = Learn4js.gradients(result, [x]);

  let x_grad = grads[0];

  println(x_grad);
});