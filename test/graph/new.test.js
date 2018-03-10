import {add, matmul, parameter, println, Tensor, variable} from '../../src/index';

test('graph', function() {

  let W = parameter([[.1, .2, .3], [.4, .5, .6]], {name: 'W'});
  let b = parameter([[.6], [.5]], {name: 'b'});
  let x = variable([3, 1], {name: 'x'});
  x.value = Tensor.create([[1], [2], [3]]);

  let z = W.matmul(x).add(b);
  let z2 = add(matmul(W, x), b);

  println(z);
  println(z2.value);

  //
  // let y = Learn4js.variable([2, 1], {name: 'y'});
  // let c = Learn4js.constant([[2, 3, 4], [5, 6, 7]], {name: 'c'});
  //
  // let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.1});
  //
  // for (let i = 0; i < 100; i++) {
  //   x.value =
  //   y.value = Tensor.create([[0.5], [0.5]]);
  //   let mm = Learn4js.matmul(W1, x);
  //   let z = Learn4js.add(mm, b1);
  //   let yHat = Learn4js.sigmoid(z);
  //
  //   let loss = Learn4js.loss.sumSquaredError(y, yHat);
  //
  //   println(loss.value.data[0]);
  //
  //   let trainStep = optimizer.minimize(loss);
  //   trainStep.eval();
  // }
  //
  // println(W1);
  // println(b1);

});
