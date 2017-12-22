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
        for (let j = 0; j < n; j++) {
          if (beta === 0) {
            for (let i = 0; i < m; i++) {
              C[i][j] = 0;
            }
          } else if (beta !== 1) {
            for (let i = 0; i < m; i++) {
              C[i][j] = beta * C[i][j];
            }
          }
          for (let l = 0; l < k; l++) {
            let temp = alpha * B[l][j];
            for (let i = 0; i < m; i++) {
              C[i][j] += temp * A[i][l];
            }
          }
        }
      } else {
        // C = alpha * A^T * B + beta * C
        for (let j = 0; j < n; j++) {
          for (let i = 0; i < m; i++) {
            let temp = 0;
            for (let l = 0; l < k; l++) {
              temp += A[l][i] * B[l][j];
            }
            C[i][j] = alpha * temp + (beta !== 0 ? beta * C[i][j] : 0);
          }
        }
      }
    } else {
      if (!transA) {
        // C = alpha * A * B^T + beta * C
        for (let j = 0; j < n; j++) {
          if (beta === 0) {
            for (let i = 0; i < m; i++) {
              C[i][j] = 0;
            }
          } else if (beta !== 1) {
            for (let i = 0; i < m; i++) {
              C[i][j] *= beta;
            }
          }
          for (let l = 0; l < k; l++) {
            let temp = alpha * B[j][l];
            for (let i = 0; i < m; i++) {
              C[i][j] += temp * A[i][l];
            }
          }
        }
      } else {
        // C = alpha * A^T * B^T + beta * C
        for (let j = 0; j < n; j++) {
          for (let i = 0; i < m; i++) {
            let temp = 0;
            for (let l = 0; l < k; l++) {
              temp += A[l][i] * B[j][l];
            }
            C[i][j] = alpha * temp + (beta !== 0 ? beta * C[i][j] : 0);
          }
        }
      }
    }
  }

  gemm2(m, n, k, alpha, a, lda, b, ldb, beta, c, ldc) {

    var outputDims = new Dimensions(n, m);
    var outputBuffer = new Buffer(outputDims, c);

    for (var i = 0; i < m; i++) {
      for (var j = 0; j < n; j++) {
        var total = 0.0;
        for (var l = 0; l < k; l++) {
          var aIndex = ((lda * l) + i);
          var aValue = a[aIndex];
          var bIndex = ((ldb * j) + l);
          var bValue = b[bIndex];
          total += (aValue * bValue);
        }
        var cIndex = ((ldc * j) + i);
        var oldCValue = c[cIndex];
        c[cIndex] = ((alpha * total) + (beta * oldCValue));
      }
    }

    return outputBuffer;
  }

}