import Learn4js, {println} from '../../src/index';

test('reduceSumGrad', function() {
  Learn4js.interactive = true;

  let node = Learn4js.parameter([[1, 2, 3], [4, 5, 6]]);
  let result = Learn4js.reduceSum(node, 1);

  println(result);


  let grads = Learn4js.gradients(result, [node]);

  let nodeGrad = grads[0];

  println(nodeGrad);
});