import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/TensorMath";

test('test add', function() {

  console.log("--- Creating random arrays and Tensors ---");

  let now = new Date();
  let EPOCH = 10000;
  let SIZE = 10000;
  let a = [];
  let b = [];
  let x = [];

  let COLS = 100;
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

  console.log(">>> Finished in", then - now, "ms");

  console.log("--- Establishing base js benchmark ---");

  now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        x[i * COLS + j] = a[i * COLS + j] + b[i * COLS + j];
      }
    }
  }


  then = new Date();
  console.log(">>> Finished in", then - now, "ms");

  console.log("--- Handwritten Performance ---");

  now = new Date();

  let stridesA = tensorA.strides;
  let stridesB = tensorB.strides;
  let stridesX = tensorX.strides;
  let arrayA = tensorA.data;
  let arrayB = tensorB.data;
  let arrayX = tensorX.data;

  for (let i = 0; i < EPOCH; i++) {

    // Without Offset Calcs
    // for (let j = 0; j < SIZE; j++) {
    //     arrayX[j] = arrayA[j] + arrayB[j];
    // }

    // With Offset Calcs
    for (let AA = 0; AA < ROWS; AA++) {

      for (let BB = 0; BB < COLS; BB++) {
        let offsetA = AA * stridesA[0] + BB * stridesA[1];
        let offsetB = AA * stridesB[0] + BB * stridesB[1];
        let offsetX = AA * stridesX[0] + BB * stridesX[1];

        arrayX[offsetX] = arrayA[offsetA] + arrayB[offsetB];
      }
    }

  }

  then = new Date();
  console.log(">>> Finished in", then - now, "ms");

  console.log("--- TensorMath Performance ---");

  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.add(tensorA, tensorB, tensorX);
  }

  then = new Date();
  console.log(">>> Finished in", then - now, "ms");
});