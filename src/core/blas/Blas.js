/**
 * Implements blas interface
 */
export default class Blas {

  // A is m * k
  // B is k * n
  // C is m * n
  gemm(transA, transB, m, n, k, alpha, A, lda, B, ldb, beta, C, ldc) {
    // checks
    if (m <= 0 || n <= 0 || k <= 0) {
      throw new Error('Invalid Argument');
    }

    if (!transB) {
      if (!transA) {
        // C = alpha * A * B + beta * C
        // C[i,j] = Sum(A[i,l] * B[l,j])
        let cIndex = 0;
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            let temp = 0;
            let aIndex = i * k;
            let bIndex = j;
            for (let l = 0; l < k; l++) {
              temp += A[aIndex] * B[bIndex];
              aIndex++;
              bIndex += n;
            }
            C[cIndex] = alpha * temp + beta * C[cIndex];
            cIndex++;
          }
        }
      } else {
        // C = alpha * A^T * B + beta * C
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            let temp = 0;
            for (let l = 0; l < k; l++) {
              temp += A[l * m + i] * B[l * k + j];
            }
            let index = i * m + j;
            C[index] = alpha * temp + (beta !== 0 ? beta * C[index] : 0);
          }
        }
      }
    } else {
      if (!transA) {
        // C = alpha * A * B^T + beta * C
        for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
            let temp = 0;
            for (let l = 0; l < k; l++) {
              temp += A[i * m + l] * B[j * k + l];
            }
            let index = i * m + j;
            C[index] = alpha * temp + (beta !== 0 ? beta * C[index] : 0);
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

}