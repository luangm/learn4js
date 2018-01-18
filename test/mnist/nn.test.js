import Learn4js from '../../src/index';
import Tensor from "../../src/core/Tensor";

test('Neural Net', function() {

  let xData = Tensor.ones([1, 784]);
  let yData = Tensor.zeros([1, 10]);

  let W = Learn4js.parameter(Tensor.zeros([784, 10]), {name: 'W'});
  let x = Learn4js.variable([1, 784], {name: 'x'});
  let b = Learn4js.parameter(Tensor.zeros([10]), {name: 'b'});
  let y = Learn4js.variable([1, 10], {name: 'y'});

  let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.001});

  for (let i = 0; i < 100; i++) {
    x.value = xData;
    y.value = yData;
    let mm = Learn4js.matmul(x, W);
    let yHat = Learn4js.add(mm, b);
    let loss = Learn4js.loss.softmaxCrossEntropy(y, yHat);

    console.log(loss.value.data[0]);
    let trainStep = optimizer.minimize(loss);
    trainStep.eval();
  }
});