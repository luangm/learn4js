import Learn4js, {Session} from '../../src/index';
import GradientDescentOptimizer from "../../src/optimizer/GradientDescentOptimizer";

test('Linear Regression', function() {
  
  let train_X = [3.3, 4.4, 5.5, 6.71, 6.93, 4.168, 9.779, 6.182, 7.59, 2.167, 7.042, 10.791, 5.313, 7.997, 5.654, 9.27, 3.1];
  let train_Y = [1.7, 2.76, 2.09, 3.19, 1.694, 1.573, 3.366, 2.596, 2.53, 1.221, 2.827, 3.465, 1.65, 2.904, 2.42, 2.94, 1.3];

  let X = Learn4js.variable({name: 'x', data: train_X, shape: [1, train_X.length]});
  let Y = Learn4js.variable({name: 'y', data: train_Y, shape: [1, train_Y.length]});
  let W = Learn4js.parameter({name: 'weight', data: [0.5], shape: [1, 1]});
  let b = Learn4js.parameter({name: 'bias', data: [0.5], shape: [1, 1]});


  let mul = Learn4js.multiply({left: W, right: X});
  let add = Learn4js.add({left: mul, right: b});
  let sub = Learn4js.subtract({left: add, right: Y});
  let square = Learn4js.square({base: sub});
  let loss = Learn4js.reduceSum({base: square});

  let optimizer = new GradientDescentOptimizer({learnRate: 0.001});
  let trainStep = optimizer.minimize(loss);

  let sess = new Session(Learn4js.activeGraph);

  for (let i = 0; i < 1000; i++) {
    sess.run(trainStep);
  }

  console.log("W", sess.run(W));
  console.log("b", sess.run(b));
  console.log("loss", sess.run(loss));

});