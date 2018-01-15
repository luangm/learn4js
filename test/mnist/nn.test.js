import Learn4js from '../../src/index';
import GradientDescentOptimizer from "../../src/optimizer/GradientDescentOptimizer";
import Tensor from "../../src/core/Tensor";

test('Neural Net', function() {

  let x = Learn4js.variable({name: 'x', shape: [-1, 784]});
  let W = Learn4js.parameter(Tensor.zeros([784, 10]);
  let b = Learn4js.parameter(Tensor.zeros([10]));

  let mm = Learn4js.matmul({name: 'mm', left: x, right: W});
  let y = Learn4js.add({name: 'y', left: mm, right: b});

  let yHat = Learn4js.variable({name: 'yHat', shape: [-1, 10]});

//  tf.reduce_mean(-tf.reduce_sum(y_ * tf.log(tf.nn.softmax(y)), reduction_indices=[1]))

    // cross_entropy = tf.reduce_mean(
    // tf.nn.softmax_cross_entropy_with_logits(labels=y_, logits=y))
  // train_step = tf.train.GradientDescentOptimizer(0.5).minimize(cross_entropy)

  let optimizer = new GradientDescentOptimizer({learnRate: 0.001});
  let trainStep = optimizer.minimize(loss);

  let sess = Learn4js.session();

  for (let i = 0; i < 1000; i++) {
    sess.run(trainStep);
  }

  console.log("W", sess.run(W));
  console.log("b", sess.run(b));
  console.log("loss", sess.run(loss));

});