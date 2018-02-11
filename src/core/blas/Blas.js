/**
 * Implements blas interface
 */

// A is m * k
// B is k * n
// C is m * n
export function gemm(transA, transB, m, n, k, alpha, A, lda, B, ldb, beta, C, ldc) {
  // checks
  if (m <= 0 || n <= 0 || k <= 0) {
    throw new Error('Invalid Argument');
  }

  let rowsA = transA ? k : m; // this is the ORIGINAL rows and cols
  let colsA = transA ? m : k;
  let rowsB = transB ? n : k;
  let colsB = transB ? k : n;

  // if (colsA !== rowsB) {
  //   throw new Error('not compatible');
  // }

  if (!transB) {
    if (!transA) {
      // C = alpha * A * B + beta * C
      // C[i,j] = Sum(A[i,l] * B[l,j])
      // let cIndex = 0;
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          let temp = 0;
          for (let l = 0; l < k; l++) {
            temp += A[i * colsA + l] * B[l * colsB + j]; // k n
          }
          let cIndex = i * colsA + j;
          C[cIndex] = alpha * temp + (beta !== 0 ? beta * C[cIndex] : 0);
          // cIndex++;
        }
      }
    } else {
      // C = alpha * A^T * B + beta * C
      let cIndex = 0;
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          let temp = 0;
          for (let l = 0; l < k; l++) {
            temp += A[l * colsA + i] * B[l * colsB + j];
          }
          C[cIndex] = alpha * temp + (beta !== 0 ? beta * C[cIndex] : 0);
          cIndex++;
        }
      }
    }
  } else {
    if (!transA) {
      // C = alpha * A * B^T + beta * C
      let cIndex = 0;
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          let temp = 0;
          for (let l = 0; l < k; l++) {
            temp += A[i * colsA + l] * B[j * colsB + l];
          }
          C[cIndex] = alpha * temp + (beta !== 0 ? beta * C[cIndex] : 0);
          cIndex++;
        }
      }
    } else {
      // C = alpha * A^T * B^T + beta * C
      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          let temp = 0;
          for (let l = 0; l < k; l++) {
            temp += A[l * m + i] * B[j * k + l];
          }
          let index = i * m + j;
          C[index] = alpha * temp + (beta !== 0 ? beta * C[index] : 0);
        }
      }
    }
  }

}