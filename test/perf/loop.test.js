import Tensor from "../../src/core/Tensor";

test('test nested loops', function() {

  let EPOCH = 1000;
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
  let diff = 0;
  let gflops = 0;

  /***** Case 1 ******/
  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < SIZE; i++) {
      x[i] = a[i] + b[i];
    }
  }

  diff = new Date() - now;
  now = new Date();
  gflops = (1 * EPOCH * SIZE) / 1e9 / (diff / 1000);
  console.log(">>> 1 large for loops,", diff, "ms,", gflops, "gflops");

  /***** Case 2 - 2 nested for loops *****/
  for (let k = 0; k < EPOCH; k++) {
    let iPtr = 0;
    let oPtr = 0;
    let rPtr = 0;
    let iD = [1, 0];
    let oD = [1, 0];
    let rD = [1, 0];

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        x[rPtr] = a[iPtr] + b[oPtr];

        iPtr += iD[0];
        oPtr += oD[0];
        rPtr += rD[0];
      }
      iPtr += iD[1];
      oPtr += oD[1];
      rPtr += rD[1];
    }
  }

  diff = new Date() - now;
  now = new Date();
  gflops = (1 * EPOCH * SIZE) / 1e9 / (diff / 1000);
  console.log(">>> 2 nested for loops,", diff, "ms,", gflops, "gflops");


  /***** Case 3 - Dynamic nested loops *****/
  for (let k = 0; k < EPOCH; k++) {
    dynamicLoop(tensorA.data, tensorB.data, tensorX.data, COLS, ROWS);
  }
  diff = new Date() - now;
  now = new Date();
  gflops = (1 * EPOCH * SIZE) / 1e9 / (diff / 1000);
  console.log(">>> dynamic 2 level loops,", diff, "ms,", gflops, "gflops");
});

function dynamicLoop(a, b, x, COLS, ROWS) {
  let slots = [0, 0];
  let depth = 2;
  let index = 0;
  let iPtr = 0;
  let oPtr = 0;
  let rPtr = 0;
  let iD = [1, 0];
  let oD = [1, 0];
  let rD = [1, 0];
  let shape = [COLS, COLS];
  let len = COLS * COLS;

  for (let i = 0; i < len; i++) {
    // TODO: Your inner loop code goes here. You can inspect the values in slots
    // console.log(iPtr, oPtr, rPtr);
    x[rPtr] = a[iPtr] + b[oPtr];
    iPtr += iD[index];
    oPtr += oD[index];
    rPtr += rD[index];

    // Increment
    slots[0]++;

    // Carry
    while (slots[index] === shape[index] && index < depth - 1) {
      // Overflow, we're done
      // if (index === depth - 1) {
      //   success = true;
      //   break;
      // }

      slots[index++] = 0;
      slots[index]++;
      iPtr += iD[index];
      oPtr += oD[index];
      rPtr += rD[index];
    }

    index = 0;
  }
}