import Learn4js, {Tensor, Logger, println} from '../src/index';
import Mnist from '../src/mnist/Mnist';


async function test() {
  console.log('test', Learn4js);
  Logger.LogLevel = Logger.Level.DEBUG;

  let mnist = new Mnist({testImageUrl: './t10k-images-idx3-ubyte.gz'});
  await mnist.init();

  let input = mnist.getNextTrainBatch(10);
  let xData = input.input.reshape([10, 784]);
  let yData = Tensor.create(
    [ [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0]]
  );

  let x = Learn4js.variable([10, 784], {name: 'x'});
  let y = Learn4js.variable([10, 10], {name: 'y'});

  let W = Learn4js.parameter(Tensor.zeros([784, 10]), {name: 'W'});
  let b = Learn4js.parameter(Tensor.zeros([1, 10]), {name: 'b'});


  let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.001});

  x.value = xData;
  y.value = yData;

  for (let i = 0; i < 10000; i++) {

    let mm = Learn4js.matmul(x, W);
    let yHat = Learn4js.add(mm, b);
    // let softmax = Learn4js.softmax(yHat);
    let xen = Learn4js.loss.softmaxCrossEntropy(y, yHat);
    let loss = Learn4js.reduceSum( xen );

    if (i % 1000 === 0) {
      println("sum loss", loss.eval());
    }

    let trainStep = optimizer.minimize(loss);
    trainStep.eval();
  }

  // println("W", W);
  println("b", b);

}

test();