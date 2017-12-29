import * as Blas from "../../src/core/blas/Blas";

test('normal matmul', function() {
  let transA = false;
  let transB = false;
  let m = 2;
  let n = 2;
  let k = 3;
  let alpha = 1;
  let beta = 0;
  let A = [1, 2, 3, 4, 5, 6]; // [[1,2,3], [4,5,6]]
  let B = [2, 3, 4, 5, 6, 7]; // [[2,3], [4,5], [6,7]]
  let C = new Array(m * n).fill(0);

  Blas.gemm(transA, transB, m, n, k, alpha, A, null, B, null, beta, C, null);
  expect(C).toEqual([28, 34, 64, 79]);
});

test('transA', function() {
  let transA = true;
  let transB = false;
  let m = 3;
  let n = 3;
  let k = 2;
  let alpha = 1;
  let beta = 0;
  let A = [1, 2, 3, 4, 5, 6]; // [[1,2,3], [4,5,6]]
  let B = [2, 3, 4, 5, 6, 7]; // [[2,3], [4,5], [6,7]]
  let C = new Array(m * n).fill(0);

  Blas.gemm(transA, transB, m, n, k, alpha, A, null, B, null, beta, C, null);
  expect(C).toEqual([22, 27, 32, 29, 36, 43, 36, 45, 54]);
});

test('transB', function() {
  let transA = false;
  let transB = true;
  let m = 2;
  let n = 2;
  let k = 3;
  let alpha = 1;
  let beta = 0;
  let A = [1, 2, 3, 4, 5, 6]; // [[1,2,3], [4,5,6]]
  let B = [2, 3, 4, 5, 6, 7]; // [[2,3], [4,5], [6,7]]
  let C = new Array(m * n).fill(0);

  Blas.gemm(transA, transB, m, n, k, alpha, A, null, B, null, beta, C, null);
  expect(C).toEqual([20, 38, 47, 92]);
});

test('transA transB', function() {
  let transA = true;
  let transB = true;
  let m = 3;
  let n = 3;
  let k = 2;
  let alpha = 1;
  let beta = 0;
  let A = [1, 2, 3, 4, 5, 6]; // [[1,2,3], [4,5,6]]
  let B = [2, 3, 4, 5, 6, 7]; // [[2,3], [4,5], [6,7]]
  let C = new Array(m * n).fill(0);

  Blas.gemm(transA, transB, m, n, k, alpha, A, null, B, null, beta, C, null);
  expect(C).toEqual([14, 24, 34, 19, 33, 47, 24, 42, 60]);
});