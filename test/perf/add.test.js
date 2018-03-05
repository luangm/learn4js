import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/TensorMath";

test('test add', function() {

  let EPOCH = 10000;
  let SIZE = 10000;
  let a = [];
  let b = [];
  let x = [];

  let COLS = 100;
  let ROWS = SIZE / COLS;

  for (let i = 0; i < SIZE; i++) {
    a.push(Math.random() + 1);
    b.push(Math.random() + 1);
    x.push(0);
  }
  let tensorA = Tensor.create(a).reshape([ROWS, COLS]);
  let tensorB = Tensor.create(b).reshape([ROWS, COLS]);
  let tensorX = Tensor.create(x).reshape([ROWS, COLS]);

  let now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        x[i * COLS + j] = a[i * COLS + j] + b[i * COLS + j];
      }
    }
  }

  let then = new Date();
  console.log(">>> JS Array For Loop:", then - now, "ms");

  now = new Date();

  let arrayA = tensorA.data;
  let arrayB = tensorB.data;
  let arrayX = tensorX.data;

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        let idx1 = i * COLS + j;
        // let idx2 = idx1 + 1;
        // let idx3 = idx1 + 2;
        // let idx4 = idx1 + 3;
        arrayX[idx1] = arrayA[idx1] + arrayB[idx1];
        // arrayX[idx2] = arrayA[idx2] + arrayB[idx2];
        // arrayX[idx3] = arrayA[idx3] + arrayB[idx3];
        // arrayX[idx4] = arrayA[idx4] + arrayB[idx4];
      }
    }
  }

  then = new Date();
  console.log(">>> Aligned Float32Array For Loop:", then - now, "ms");

  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.add(tensorA, tensorB, tensorX);
  }

  then = new Date();
  console.log(">>> TensorMath AddOp", then - now, "ms");
});