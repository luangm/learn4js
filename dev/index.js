import Learn4js, {Tensor, Logger, println} from '../src/index';
import Mnist from '../src/mnist/Mnist';


async function test() {
  console.log('test', Learn4js);
  Logger.LogLevel = Logger.Level.DEBUG;

  // let mnist = new Mnist({testImageUrl: './t10k-images-idx3-ubyte.gz'});

  let path = "/users/luangm/IdeaProjects/learn4js/test/mnist/train-images-idx3-ubyte.gz";
  // let fileBuffer = fs.readFileSync(path);
  let mnist = new Mnist({testImageUrl: './train-images-idx3-ubyte.gz'});
  await mnist.init();
  // mnist._processImages(fileBuffer.buffer);

  let input = mnist.getNextTrainBatch(10);
  let xData = input.input.reshape([10, 784]);
  let yData = Tensor.create(
    [[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
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

  let W = Learn4js.parameter(Tensor.ones([784, 10]), {name: 'W'});
  let b = Learn4js.parameter(Tensor.ones([1, 10]), {name: 'b'});

  let aa = Learn4js.constant(Tensor.scalar(0.1), {name: "AAAA"});
  // let optimizer = Learn4js.optimizer.gradientDescent({learnRate: 0.001});

  x.value = xData;
  y.value = yData;

  let mm = Learn4js.matmul(x, W);
  let yHat = Learn4js.add(mm, b);
  let xen = Learn4js.loss.softmaxCrossEntropy(y, yHat);
  let loss = Learn4js.reduceSum(xen);
  // println("sum loss", loss.eval());

  let grads = Learn4js.gradients(loss, [W, b]);
  let W_grad = grads[0];
  let b_grad = grads[1];

  let lr = Learn4js.constant(Tensor.scalar(0.001), {name: 'lr'});
  let w_mul = Learn4js.subtract(W, Learn4js.multiply(lr, W_grad));
  let b_mul = Learn4js.subtract(b, Learn4js.multiply(lr, b_grad));

  let now = new Date();

  for (let i = 0; i < 10000; i++) {
    let w_new = w_mul.eval();
    let b_new = b_mul.eval();

    W.value = w_new;
    b.value = b_new;
    //   let trainStep = optimizer.minimize(loss);
    //   trainStep.eval();
  }

  let then = new Date();
  // println("W", W);
  println("b", b);
  println("Took " + (then.getTime() - now.getTime()) + " ms");
  // println(W);

}

test();