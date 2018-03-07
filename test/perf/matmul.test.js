import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/TensorMath";

test('test matmul', function() {

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

  let now = new Date();

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

  console.log(">>> base js benchmark: ", new Date() - now, "ms");
  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.matmul(tensorA, tensorB, false, true, tensorX);
  }

  console.log(">>> TensorMath.matmul", new Date() - now, "ms");
});