import fs from "fs";
import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/util/TensorMath";
import Learn4js, {Logger, println} from '../../src/index';
import Mnist from "../../src/mnist/Mnist";

test('Neural Net', function() {

  // Learn4js.interactive = true;

  Logger.LogLevel = Logger.Level.DEBUG;

  let path = "/users/luangm/IdeaProjects/learn4js/test/mnist/train-images-idx3-ubyte.gz";
  let fileBuffer = fs.readFileSync(path);
  let mnist = new Mnist({testImageUrl: './train-images-idx3-ubyte.gz'});
  mnist._processImages(fileBuffer.buffer);

  let BATCH = 10;

  let input = mnist.getNextTrainBatch(BATCH);
  let xData = input.input.reshape([BATCH, 784]);
  let yArray = [];
  for (let i = 0; i < BATCH; i++) {
    for (let j = 0; j < 10; j++) {
      yArray.push(j === 0 ? 1: 0);
    }
  }
  let yData = Tensor.create(yArray).reshape([BATCH, 10]);

  let x = Learn4js.variable([BATCH, 784], {name: 'x'});
  let y = Learn4js.variable([BATCH, 10], {name: 'y'});

  let W = Learn4js.parameter(Tensor.ones([784, 10]), {name: 'W'});
  let b = Learn4js.parameter(Tensor.ones([1, 10]), {name: 'b'});

  // let aa = Learn4js.constant(Tensor.scalar(0.1), {name: "AAAA"});
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

  let lr2 = Tensor.ones([784, 10]);
  let lr3 = Learn4js.constant(TensorMath.multiply(Tensor.scalar(0.001), lr2), {name: 'lr2'});

  let lr4 = Tensor.ones([1, 10]);
  let lr5 = Learn4js.constant(TensorMath.multiply(Tensor.scalar(0.001), lr4), {name: 'lr4'});

  // let lr = Learn4js.constant(Tensor.scalar(0.001), {name: 'lr'});
  let w_lr = Learn4js.multiply(lr3, W_grad);
  let w_mul = Learn4js.subtract(W, w_lr);
  let b_lr = Learn4js.multiply(lr5, b_grad);
  let b_mul = Learn4js.subtract(b, b_lr);


  let softmax = Learn4js.softmax(yHat);
  let sub = Learn4js.subtract(softmax, y);
  let tile = Learn4js.constant(Tensor.ones([BATCH, 10]), {name: 'tile'});
  let yHatGrad = Learn4js.multiply(tile, sub);
  let dL_dW = Learn4js.matmul(x, yHatGrad, true, false);
  let dW = Learn4js.multiply(lr3, dL_dW);
  let newW = Learn4js.subtract(W, dW);
  let dL_db = Learn4js.reduceSum(yHatGrad, 1);
  let db = Learn4js.multiply(lr5, dL_db);
  let newB = Learn4js.subtract(b, db);

  let now = new Date();

  for (let i = 0; i < 10000; i++) {
    // W_grad.eval();
    // w_lr.eval();

    mm.eval();
    yHat.eval();
    // softmax.eval();
    // sub.eval();
    // yHatGrad.eval();
    // dL_dW.eval();
    // dW.eval();
    // newW.eval();
    // //
    // dL_db.eval();
    // db.eval();
    // newB.eval();

    // TensorMath.multiply(dd, f);
    // let w_new = w_mul.eval();
    // let b_new = b_mul.eval();
    //
    // W.value = w_new;
    // b.value = b_new;
    //   let trainStep = optimizer.minimize(loss);
    //   trainStep.eval();
  }

  let then = new Date();
  // println("W", W);
  println("b", b);
  println("Took " + (then.getTime() - now.getTime()) + " ms");
  // println(W);

});