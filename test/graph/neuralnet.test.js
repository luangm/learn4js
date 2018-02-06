import Learn4js, {Session, Logger} from '../../src/index.js';
import GradientDescentOptimizer from "../../src/optimizer/GradientDescentOptimizer";
import {println} from "../../src/index";
import Tensor from "../../src/core/Tensor";

test('graph', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x_data = Tensor.create([[0.2, 0.3], [0.3, 0.4], [0.1, 0.1]]);
  let y_data = Tensor.create([[.3, .4], [.4, .5]]);

  let W = Learn4js.parameter([[.1, .2, .3], [.4, .5, .6]], {name: "W"});
  let b = Learn4js.parameter([[.6], [.5]], {name: "b"});
  let x = Learn4js.variable([3, 2], {name: 'x'});
  let y = Learn4js.variable([2, 2], {name: 'Y'});
  x.value = x_data;
  y.value = y_data;

  let matmul = Learn4js.matmul(W, x);
  let add = Learn4js.add(matmul, b);
  let yHat = Learn4js.sigmoid(add);
  let sub = Learn4js.subtract(y, yHat);
  let square = Learn4js.square(sub);
  let loss = Learn4js.reduceSum(square);

  let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.1});
  let trainStep = optimizer.minimize(loss);

  // let sess = new Session(Learn4js.activeGraph);

  for (let i = 0; i < 100000; i++) {
    trainStep.eval();
    // sess.run(trainStep);
  }

  println(loss.eval());
  println(W.eval());
  println(b.eval());

  // println("Loss", sess.run(loss));
  // println("W1", sess.run(W));
  // println("b1", sess.run(b));

});
