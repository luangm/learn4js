import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/TensorMath";

test('test exp', function() {

  let EPOCH = 1000;
  let SIZE = 10000;
  let a = [];
  let x = [];

  let COLS = 100;
  let ROWS = SIZE / COLS;

  for (let i = 0; i < SIZE; i++) {
    a.push(Math.random());
    x.push(0);
  }
  let tensorA = Tensor.create(a).reshape([1, ROWS, COLS]);
  let tensorX = Tensor.create(x).reshape([1, ROWS, COLS]);

  let now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    for (let j = 0; j < SIZE; j++) {
      x[j] = Math.exp(a[j]);
    }
  }

  let then = new Date();
  console.log(">>> base js benchmark: ", then - now, "ms");

  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    TensorMath.exp(tensorA, tensorX);
  }

  then = new Date();
  console.log(">>> TensorMath", then - now, "ms");
});