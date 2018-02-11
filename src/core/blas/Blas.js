/**
 * Implements blas interface
 */

function gemm00_old(m, n, k, alpha, A, B, beta, C) {
  // C = alpha * A * B + beta * C
  // C[i,j] = Sum(A[i,l] * B[l,j])
  // let cIndex = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let temp = 0;
      for (let l = 0; l < k; l++) {
        temp += A[i * k + l] * B[l * n + j]; // k n
      }
      let cIndex = i * k + j; // ?
      C[cIndex] = alpha * temp + (beta !== 0 ? beta * C[cIndex] : 0);
    }
  }
}

function gemm10_old(m, n, k, alpha, A, B, beta, C) {
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

// Not Trans A, Not Trans B
// C = alpha * A * B + beta * C
// C[i,j] = Sum(A[i,l] * B[l,j])
// Use Blocks of 4x4.
// LDA = K
// LDB = N
// LDC = N
function gemm00(m, n, k, alpha, A, B, beta, C) {

  let floorM = Math.floor(m / 4) * 4;
  let floorN = Math.floor(n / 4) * 4;

  for (let i = 0; i < floorM; i += 4) {
    for (let j = 0; j < floorN; j += 4) {

      let sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let p = 0; p < k; p++) {
        let a0 = A[i * k + p];
        let a1 = A[(i + 1) * k + p];
        let a2 = A[(i + 2) * k + p];
        let a3 = A[(i + 3) * k + p];

        let b0 = B[p * n + j];
        let b1 = B[p * n + j + 1];
        let b2 = B[p * n + j + 2];
        let b3 = B[p * n + j + 3];

        sums[0] += a0 * b0;
        sums[1] += a0 * b1;
        sums[2] += a0 * b2;
        sums[3] += a0 * b3;
        sums[4] += a1 * b0;
        sums[5] += a1 * b1;
        sums[6] += a1 * b2;
        sums[7] += a1 * b3;
        sums[8] += a2 * b0;
        sums[9] += a2 * b1;
        sums[10] += a2 * b2;
        sums[11] += a2 * b3;
        sums[12] += a3 * b0;
        sums[13] += a3 * b1;
        sums[14] += a3 * b2;
        sums[15] += a3 * b3;
      }

      C[i * n + j] += sums[0];
      C[i * n + j + 1] += sums[1];
      C[i * n + j + 2] += sums[2];
      C[i * n + j + 3] += sums[3];
      C[(i + 1) * n + j] += sums[4];
      C[(i + 1) * n + j + 1] += sums[5];
      C[(i + 1) * n + j + 2] += sums[6];
      C[(i + 1) * n + j + 3] += sums[7];
      C[(i + 2) * n + j] += sums[8];
      C[(i + 2) * n + j + 1] += sums[9];
      C[(i + 2) * n + j + 2] += sums[10];
      C[(i + 2) * n + j + 3] += sums[11];
      C[(i + 3) * n + j] += sums[12];
      C[(i + 3) * n + j + 1] += sums[13];
      C[(i + 3) * n + j + 2] += sums[14];
      C[(i + 3) * n + j + 3] += sums[15];
    }
  }

  // for (let i = 0; i < floorM; i++) {
  //   for (let j = floorN; j < n; j++) {
  //
  //     let sum = 0;
  //     for (let p = 0; p < k; p++) {
  //       sum += A[i * k + p] * B[p * n + j];
  //     }
  //     C[i * n + j] += sum;
  //
  //   }
  // }
  //
  // for (let i = floorM; i < m; i++) {
  //   for (let j = 0; j < floorN; j++) {
  //
  //     let sum = 0;
  //     for (let p = 0; p < k; p++) {
  //       sum += A[i * k + p] * B[p * n + j];
  //     }
  //     C[i * n + j] += sum;
  //
  //   }
  // }
  //
  // for (let i = floorM; i < m; i++) {
  //   for (let j = floorN; j < n; j++) {
  //
  //     let sum = 0;
  //     for (let p = 0; p < k; p++) {
  //       sum += A[i * k + p] * B[p * n + j];
  //     }
  //     C[i * n + j] += sum;
  //
  //   }
  // }
}

// Trans A, Not Trans B
// C = alpha * A^T * B + beta * C
// M
// C[i,j] = Sum(A[l,i] * B[l,j])
// Use Blocks of 4x4.
// LDA = K
// LDB = N
// LDC = N
function gemm10(m, n, k, alpha, A, B, beta, C) {

  let floorM = Math.floor(m / 4) * 4;
  let floorN = Math.floor(n / 4) * 4;

  for (let i = 0; i < floorM; i += 4) {
    for (let j = 0; j < floorN; j += 4) {

      let sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let p = 0; p < k; p++) {
        let a0 = A[p * m + i];
        let a1 = A[p * m + i + 1];
        let a2 = A[p * m + i + 2];
        let a3 = A[p * m + i + 3];

        let b0 = B[p * n + j];
        let b1 = B[p * n + j + 1];
        let b2 = B[p * n + j + 2];
        let b3 = B[p * n + j + 3];

        sums[0] += a0 * b0;
        sums[1] += a0 * b1;
        sums[2] += a0 * b2;
        sums[3] += a0 * b3;
        sums[4] += a1 * b0;
        sums[5] += a1 * b1;
        sums[6] += a1 * b2;
        sums[7] += a1 * b3;
        sums[8] += a2 * b0;
        sums[9] += a2 * b1;
        sums[10] += a2 * b2;
        sums[11] += a2 * b3;
        sums[12] += a3 * b0;
        sums[13] += a3 * b1;
        sums[14] += a3 * b2;
        sums[15] += a3 * b3;
      }

      C[i * n + j] += sums[0];
      C[i * n + j + 1] += sums[1];
      C[i * n + j + 2] += sums[2];
      C[i * n + j + 3] += sums[3];
      C[(i + 1) * n + j] += sums[4];
      C[(i + 1) * n + j + 1] += sums[5];
      C[(i + 1) * n + j + 2] += sums[6];
      C[(i + 1) * n + j + 3] += sums[7];
      C[(i + 2) * n + j] += sums[8];
      C[(i + 2) * n + j + 1] += sums[9];
      C[(i + 2) * n + j + 2] += sums[10];
      C[(i + 2) * n + j + 3] += sums[11];
      C[(i + 3) * n + j] += sums[12];
      C[(i + 3) * n + j + 1] += sums[13];
      C[(i + 3) * n + j + 2] += sums[14];
      C[(i + 3) * n + j + 3] += sums[15];
    }
  }

  // for (let i = 0; i < floorM; i++) {
  //   for (let j = floorN; j < n; j++) {
  //
  //     let sum = 0;
  //     for (let p = 0; p < k; p++) {
  //       sum += A[i * k + p] * B[p * n + j];
  //     }
  //     C[i * n + j] += sum;
  //
  //   }
  // }
  //
  // for (let i = floorM; i < m; i++) {
  //   for (let j = 0; j < floorN; j++) {
  //
  //     let sum = 0;
  //     for (let p = 0; p < k; p++) {
  //       sum += A[i * k + p] * B[p * n + j];
  //     }
  //     C[i * n + j] += sum;
  //
  //   }
  // }
  //
  // for (let i = floorM; i < m; i++) {
  //   for (let j = floorN; j < n; j++) {
  //
  //     let sum = 0;
  //     for (let p = 0; p < k; p++) {
  //       sum += A[i * k + p] * B[p * n + j];
  //     }
  //     C[i * n + j] += sum;
  //
  //   }
  // }
}

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
      gemm00(m, n, k, alpha, A, B, beta, C);
    } else {
      gemm10(m, n, k, alpha, A, B, beta, C);
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


