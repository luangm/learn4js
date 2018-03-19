import {create, parameter, reduceSum, sigmoid, variable} from "../../src/index";
// import {Tensor} from "tensor4js";

test('graph', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let x_data = create([[0.2, 0.3], [0.3, 0.4], [0.1, 0.1]]);
  let y_data = create([[.3, .4], [.4, .5]]);

  let W = parameter([[.1, .2, .3], [.4, .5, .6]], {name: "W"});
  let b = parameter([[.6], [.5]], {name: "b"});
  let x = variable([3, 2], {name: 'x'});
  let y = variable([2, 2], {name: 'Y'});
  x.value = x_data;
  y.value = y_data;

  let matmul = W.matmul(x);
  let add = matmul.add(b);
  let yHat = sigmoid(add);
  let sub = y.subtract(yHat);
  let sqr = sub.square();
  let loss = reduceSum(sqr);

  console.log(loss.value);

  // println(loss.eval());
  // println(W.eval());
  // println(b.eval());

  // println("Loss", sess.run(loss));
  // println("W1", sess.run(W));
  // println("b1", sess.run(b));

});
