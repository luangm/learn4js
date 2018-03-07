import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/TensorMath";

test('test add', function() {

  let EPOCH = 100;
  let SIZE = 1024 * 1024;
  let a = [];
  let b = [];
  let x = [];

  let COLS = 1024;
  let ROWS = SIZE / COLS;

  for (let i = 0; i < SIZE; i++) {
    a.push(i + 0.1);
    b.push(i + 1.1);
    x.push(0);
  }
  let tensorA = Tensor.create(a).reshape([ROWS, COLS]);
  let tensorB = Tensor.create(b).reshape([ROWS, COLS]);
  let tensorX = Tensor.create(x).reshape([ROWS, COLS]);

  let tensorA3D = tensorA.reshape([1, ROWS, COLS]);
  let tensorB3D = tensorB.reshape([1, ROWS, COLS]);
  let tensorX3D = tensorX.reshape([1, ROWS, COLS]);

  let now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    let iPtr = 0;
    let oPtr = 0;
    let rPtr = 0;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        x[rPtr] = a[iPtr] + b[oPtr];

        iPtr += 1;
        oPtr += 1;
        rPtr += 1;
      }
    }
  }

  console.log(">>> JS Array For Loop:", new Date() - now, "ms");
  now = new Date();

  let arrayA = tensorA.data;
  let arrayB = tensorB.data;
  let arrayX = tensorX.data;

  for (let k = 0; k < EPOCH; k++) {

    let iPtr = 0 | 0;
    let oPtr = 0 | 0;
    let rPtr = 0 | 0;

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        arrayX[rPtr] = arrayA[iPtr] + arrayB[oPtr];

        iPtr = (iPtr + 1) | 0;
        oPtr = (oPtr + 1) | 0;
        rPtr = (rPtr + 1) | 0;
      }
    }
  }

  console.log(">>> Aligned Float32Array For Loop:", new Date() - now, "ms");

  now = new Date();
  for (let i = 0; i < EPOCH; i++) {
    TensorMath.add(tensorA, tensorB, tensorX);
  }
  console.log(">>> TensorMath AddOp", new Date() - now, "ms");

  now = new Date();
  for (let i = 0; i < EPOCH; i++) {
    TensorMath.add(tensorA3D, tensorB3D, tensorX3D);
  }
  console.log(">>> TensorMath AddOp on 3D", new Date() - now, "ms");
});