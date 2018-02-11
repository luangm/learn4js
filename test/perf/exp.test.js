import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/util/TensorMath";

test('test exp', function() {

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


  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.exp(tensorA, tensorX);
  }

  then = new Date();
  console.log(">>> TensorMath", then - now, "ms");
});