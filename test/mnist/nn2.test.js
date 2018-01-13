import Learn4js from '../../src/index';
import GradientDescentOptimizer from "../../src/optimizer/GradientDescentOptimizer";
import Tensor from "../../src/core/Tensor";

test('Neural Net', function() {

  let logits = Learn4js.parameter({name: 'x', data: Tensor.create([[1,2,3,4], [5,6,7,8]])});
  let labels = Learn4js.parameter({name: 'label', data: Tensor.create([[0,0,0,1], [1,0,0,0]])});

  // let ce = Learn4js.softmaxCrossEntropyWithLogits()
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