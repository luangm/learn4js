import Learn4js, {Session} from '../../src/index.js';
import GradientDescentOptimizer from "../../src/optimizer/GradientDescentOptimizer";
import {println} from "../../src/index";

test('graph', function() {
  // Learn4js.graph(function() {
  //   let a = [1,2,3];
  //   let b = [4, 5, 6];
  //   let c = a - b;
  //   println(c);
  // });

  let W1 = Learn4js.parameter({name: 'W1', data: [.1, .2, .3, .4, .5, .6], shape: [2, 3]});
  let b1 = Learn4js.parameter({name: 'b1', data: [.6, .5], shape: [2, 1]});
  let x = Learn4js.variable({name: 'x', data: [0.2, 0.3, 0.3, 0.4, 0.1, 0.1], shape: [3, 2]});
  let y = Learn4js.variable({name: 'Y', data: [.3, .4, .4, .5], shape: [2, 2]});

  let matmul = Learn4js.matmul({name: 'matmul', left: W1, right: x});
  let add = Learn4js.add({name: 'add', left: matmul, right: b1});
  let sigmoid = Learn4js.sigmoid({name: 'sigmoid', base: add});
  let sub = Learn4js.subtract({name: 'sub', left: y, right: sigmoid});
  let square = Learn4js.square({name: 'square', base: sub});
  let loss = Learn4js.reduceSum({name: 'loss', base: square});

  let optimizer = new GradientDescentOptimizer({learnRate: 0.1});
  let trainStep = optimizer.minimize(loss);

  let sess = new Session(Learn4js.activeGraph);

  for (let i = 0; i < 10000; i++) {
    sess.run(trainStep);
  }

  println("Loss", sess.run(loss));
  println("W1", sess.run(W1));
  println("b1", sess.run(b1));

});
