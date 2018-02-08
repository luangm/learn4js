import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/util/TensorMath";

test('test add', function() {

  console.log("--- Creating random arrays and Tensors ---");

  let now = new Date();
  let EPOCH = 10000;
  let SIZE = 100000;
  let a = [];
  let b = [];
  let x = [];
  for (let i = 0; i < SIZE; i++) {
    a.push(Math.random());
    b.push(Math.random());
    x.push(0);
  }
  let tensorA = Tensor.create(a);
  let tensorB = Tensor.create(b);
  let tensorX = Tensor.create(x);

  let then = new Date();

  console.log(">>> Finished in", then - now, "ms");

  console.log("--- Establishing base js benchmark ---");

  now = new Date();

  for (let i = 0; i < EPOCH; i++) {
    for (let j = 0; j < SIZE; j++) {
      x[j] = a[j] + b[j];
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