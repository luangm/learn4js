import Learn4js, {Logger, println, Tensor} from '../src/index';
import Mnist from '../src/mnist/Mnist';
import TensorMath from "../src/core/util/TensorMath";

// import weblas from 'weblas';

function testWeblas() {
  var h1 = 784, w1 = 10,
    h2 = 10, w2 = 10;

  var A = new Float32Array(h1 * w1);
  var B = new Float32Array(h2 * w2);

// fill A and B with science

  var M = h1,
    N = w2,
    K = h2; // must match w1

  var alpha = 1.0;
  var beta = 0.0;
  var C = new Float32Array(w2)      // specialized for neural net bias calculation

  // let weblas = require('weblas');

  console.log(">>>", weblas);
  //
  // let canvas = document.createElement('canvas');
  // let glOptions = {premultipliedAlpha: false, preserveDrawingBuffer: false};
  // let context = canvas.getContext("experimental-webgl", glOptions);
  // console.log(context);

  let now = new Date();
  for (let  i = 0; i < 10000; i++){
    let result = weblas.sgemm(M, N, K, alpha, A, B, beta, C);
  }
  // console.log(result);


  let then = new Date();

  console.log(then - now);
}

async function testMnist() {
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
  let tile = Learn4js.constant(Tensor.ones([10, 10]), {name: 'tile'});
  let yHatGrad = Learn4js.multiply(tile, sub);
  let dL_dW = Learn4js.matmul(x, yHatGrad, true, false);
  let dW = Learn4js.multiply(lr3, dL_dW);
  let newW = Learn4js.subtract(W, dW);
  let dL_db = Learn4js.reduceSum(yHatGrad, 0);

  let now = new Date();

  for (let i = 0; i < 10000; i++) {
    // W_grad.eval();
    // w_lr.eval();

    mm.eval();
    yHat.eval();
    softmax.eval();
    sub.eval();
    yHatGrad.eval();
    dL_dW.eval();
    dW.eval();
    newW.eval();
    //
    // dL_db.eval();

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

}

function testExp() {
  let now = new Date();
  let EPOCH = 10000;
  let SIZE = 10000;
  let a = [];
  let x = [];

  let COLS = 100;
  let ROWS = SIZE / COLS;

  for (let i = 0; i < SIZE; i++) {
    a.push(Math.random());
    x.push(0);
  }
  let tensorA = Tensor.create(a).reshape([ROWS, COLS]);
  let tensorX = Tensor.create(x).reshape([ROWS, COLS]);

  let then = new Date();

  console.log(">>> Set Up", then - now, "ms");

  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    for (let j = 0; j < SIZE; j++) {
      x[j] = Math.exp(a[j]);
    }
  }

  then = new Date();
  console.log(">>> base js benchmark: ", then - now, "ms");
  console.log(x);

  now = new Date();

  let stridesA = tensorA.strides;
  let stridesX = tensorX.strides;
  let arrayA = tensorA.data;
  let arrayX = tensorX.data;

  for (let i = 0; i < EPOCH; i++) {

    for (let AA = 0; AA < ROWS; AA++) {

      for (let BB = 0; BB < COLS; BB++) {
        let offsetA = AA * stridesA[0] + BB * stridesA[1];
        let offsetX = AA * stridesX[0] + BB * stridesX[1];

        arrayX[offsetX] = Math.exp(arrayA[offsetA]);
      }
    }
  }

  then = new Date();
  console.log(">>> Handwritten", then - now, "ms");
  console.log(tensorX);


  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.exp(tensorA, tensorX);
  }

  then = new Date();
  console.log(">>> TensorMath", then - now, "ms");
  console.log(tensorX);
}

function testMatmul() {
  let now = new Date();
  let EPOCH = 10;
  let SIZE = 512 * 512;
  let a = [];
  let b = [];
  let x = [];

  let COLS = 512;
  let ROWS = SIZE / COLS;

  for (let i = 0; i < SIZE; i++) {
    a.push(Math.random());
    b.push(Math.random());
    x.push(0);
  }
  let tensorA = Tensor.create(a).reshape([ROWS, COLS]);
  let tensorB = Tensor.create(b).reshape([ROWS, COLS]);
  let tensorX = Tensor.create(x).reshape([ROWS, COLS]);

  let then = new Date();

  console.log(">>> Set Up", then - now, "ms");

  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {

        let sum = 0;
        for (let k = 0; k < COLS; k++) {
          sum += a[r * COLS + k] * b[k * COLS + c];
        }
        x[r * COLS + c] = sum;

      }
    }
  }

  then = new Date();
  console.log(">>> base js benchmark: ", then - now, "ms");

  now = new Date();

  let stridesA = tensorA.strides;
  let stridesB = tensorB.strides;
  let stridesX = tensorX.strides;
  let arrayA = tensorA.data;
  let arrayB = tensorB.data;
  let arrayX = tensorX.data;

  for (let i = 0; i < EPOCH; i++) {

    for (let AA = 0; AA < ROWS; AA++) {

      for (let BB = 0; BB < COLS; BB++) {
        let offsetA = AA * stridesA[0] + BB * stridesA[1];
        let offsetB = AA * stridesB[0] + BB * stridesB[1];
        let offsetX = AA * stridesX[0] + BB * stridesX[1];

        arrayX[offsetX] = arrayA[offsetA] * arrayB[offsetB];
      }
    }
  }

  then = new Date();
  console.log(">>> Handwritten", then - now, "ms");


  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.matmul(tensorA, tensorB, false, false, tensorX);
  }

  then = new Date();
  console.log(">>> TensorMath", then - now, "ms");
}
// testWeblas();
// testMnist();
// testExp();

// testMatmul();


function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
// Returns a random integer from 0 to range - 1.
function randomInt(range) {
  return Math.floor(Math.random() * range);
}

// Fills the buffer with the values that define a rectangle.

function setRectangle(gl, x, y, width, height) {
  var x1 = x;
  var x2 = x + width;
  var y1 = y;
  var y2 = y + height;

  // NOTE: gl.bufferData(gl.ARRAY_BUFFER, ...) will affect
  // whatever buffer is bound to the `ARRAY_BUFFER` bind point
  // but so far we only have one buffer. If we had more than one
  // buffer we'd want to bind that buffer to `ARRAY_BUFFER` first.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2]), gl.STATIC_DRAW);
}
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function webgl() {
  var canvas = document.getElementById("c");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    // no webgl for you!
    console.log("No webgl");
    return;
  }

  var vertexShaderSource = document.getElementById("2d-vertex-shader").text;
  var fragmentShaderSource = document.getElementById("2d-fragment-shader").text;

  var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  var program = createProgram(gl, vertexShader, fragmentShader);
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // three 2d points
  // var positions = [
  //   0, 0,
  //   0, 0.5,
  //   0.7, 0,
  // ];
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);



  var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
  var positions = [
    10, 20,
    150, 20,
    10, 60,
    50, 80,
    90, 120,
    120, 240,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  gl.enableVertexAttribArray(positionAttributeLocation);
  // set the resolution
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  var size = 2;          // 2 components per iteration
  var type = gl.FLOAT;   // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0;        // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset)


  var colorUniformLocation = gl.getUniformLocation(program, "u_color");

  // draw 50 random rectangles in random colors
  for (var ii = 0; ii < 50; ++ii) {
    // Setup a random rectangle
    // This will write to positionBuffer because
    // its the last thing we bound on the ARRAY_BUFFER
    // bind point
    setRectangle(
      gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));

    // Set a random color.
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), Math.random(), 1);

    // Draw the rectangle.
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
// // draw
//   var primitiveType = gl.TRIANGLES;
//   var offset = 0;
//   var count = 6;
//   gl.drawArrays(primitiveType, offset, count);

}

webgl();