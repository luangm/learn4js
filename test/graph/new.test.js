import Learn4js, {println, Tensor} from '../../src/index';

test('graph', function() {

  Learn4js.interactive = true;

  let W1 = Learn4js.parameter([[.1, .2, .3], [.4, .5, .6]], {name: 'W1'});
  let b1 = Learn4js.parameter([[.6], [.5]], {name: 'b1'});
  let x = Learn4js.variable([3, 1], {name: 'x'});
  let y = Learn4js.variable([2, 1], {name: 'y'});

  let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.1});

  for (let i = 0; i < 10; i++) {
    x.value = Tensor.create([[1 + i], [2 + i], [3 + i]]);
    y.value = Tensor.create([[0.5 + i], [0.5 + i]]);
    let mm = Learn4js.matmul(W1, x);
    // let z = Learn4js.add(mm, b1);
    // let yHat = Learn4js.sigmoid(z);
    // let loss = Learn4js.loss.sumSquaredError(y, yHat);
    let trainStep = optimizer.minimize(mm);
    trainStep.eval();
  }

  println(W1);
  println(b1);


  // let add = Learn4js.add(W1, b1, {name: 'add'});
  // let sigmoid = Learn4js.sigmoid(add);

  // let x = Learn4js.variable({name: 'x', data: [0.2, 0.3, 0.3, 0.4, 0.1, 0.1], shape: [3, 2]});
  // let y = Learn4js.variable({name: 'Y', data: [.3, .4, .4, .5], shape: [2, 2]});
  //
  // let matmul = Learn4js.matmul({name: 'matmul', left: W1, right: x});
  // let add = Learn4js.add({name: 'add', left: matmul, right: b1});
  // let sigmoid = Learn4js.sigmoid({name: 'sigmoid', base: add});
  // let sub = Learn4js.subtract({name: 'sub', left: y, right: sigmoid});
  // let square = Learn4js.square({name: 'square', base: sub});
  // let loss = Learn4js.reduceSum({name: 'loss', base: square});
  //
  // let optimizer = new GradientDescentOptimizer({learnRate: 0.1});
  // let trainStep = optimizer.minimize(loss);
  //
  // let sess = new Session(Learn4js.activeGraph);
  //
  // for (let i = 0; i < 10000; i++) {
  //   sess.run(trainStep);
  // }
  //
  // println("Loss", sess.run(loss));
  // println("W1", sess.run(W1));
  // println("b1", sess.run(b1));

});
