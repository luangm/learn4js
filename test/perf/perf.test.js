import Tensor from "../../src/core/Tensor";
import TensorMath from "../../src/core/TensorMath";

test('test mul', function() {
  let now = new Date();
  let a = 0.001;
  let b = 1.001;
  let x = 0;
  for (let i = 0; i < 10000 * 10000; i++) {
    // a += 0.001;
    // b += 0.001;
    x += a + b;
  }

  let then = new Date();
  console.log(x);
  console.log(then - now);



  let A = Tensor.ones([784, 10]);
  let B = Tensor.ones([10, 10]);
  let C = Tensor.create([784, 10]);

  now = new Date();

  for (let i = 0; i < 10000; i++) {
    TensorMath.matmul(A, B);
  }

  then = new Date();
  console.log(then - now);

  let arrayA = new Float32Array(7840);
  let arrayB = new Float32Array(7840);
  let arrayC = new Float32Array(7840);

  now = new Date();

  for (let i = 0; i < 10000; i++) {
    for (let j = 0; j < arrayA.length; j++) {
      arrayC[j] = arrayA[j] + arrayB[j];
    }
  }

  then = new Date();
  console.log(then - now);
});