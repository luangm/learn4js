test('3 - gemm 4x4 Padding', function() {

  // 2865 -> 4915 -> 2052

  let EPOCH = 10;
  let ROWS = 512;
  let COLS = 512;
  let SIZE = ROWS * COLS;
  let LDA = COLS;
  let LDB = COLS;
  let LDC = COLS;
  let M = ROWS;
  let N = COLS;
  let K = COLS;

  let a = []; // A = m * k
  let b = []; // B = k * n
  let c = []; // C = m * n

  for (let i = 0; i < SIZE; i++) {
    a.push(Math.random());
    b.push(Math.random());
    c.push(0);
  }

  let now = new Date();
  let floorM = Math.floor(M / 4) * 4 | 0;
  let floorN = Math.floor(N / 4) * 4 | 0;

  console.log(floorM, floorN);

  for (let e = 0; e < EPOCH; e++) {

    for (let i = 0; i < floorM; i += 4) {
      for (let j = 0; j < floorN; j += 4) {

        let sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let p = 0; p < K; p++) {
          let a0 = a[i * LDA + p];
          let a1 = a[(i + 1) * LDA + p];
          let a2 = a[(i + 2) * LDA + p];
          let a3 = a[(i + 3) * LDA + p];

          let b0 = b[p * LDB + j];
          let b1 = b[p * LDB + j + 1];
          let b2 = b[p * LDB + j + 2];
          let b3 = b[p * LDB + j + 3];

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

        c[i * LDC + j] += sums[0];
        c[i * LDC + j + 1] += sums[1];
        c[i * LDC + j + 2] += sums[2];
        c[i * LDC + j + 3] += sums[3];
        c[(i + 1) * LDC + j] += sums[4];
        c[(i + 1) * LDC + j + 1] += sums[5];
        c[(i + 1) * LDC + j + 2] += sums[6];
        c[(i + 1) * LDC + j + 3] += sums[7];
        c[(i + 2) * LDC + j] += sums[8];
        c[(i + 2) * LDC + j + 1] += sums[9];
        c[(i + 2) * LDC + j + 2] += sums[10];
        c[(i + 2) * LDC + j + 3] += sums[11];
        c[(i + 3) * LDC + j] += sums[12];
        c[(i + 3) * LDC + j + 1] += sums[13];
        c[(i + 3) * LDC + j + 2] += sums[14];
        c[(i + 3) * LDC + j + 3] += sums[15];
      }
    }

    // for (let i = 0; i < floorM; i++) {
    //   for (let j = floorN; j < N; j++) {
    //     let sum = 0;
    //     for (let p = 0; p < K; p++) {
    //       sum += a[i * LDA + p] *  b[p * LDB + j];
    //     }
    //     c[i * LDC + j] += sum;
    //   }
    // }
    //
    // for (let i = floorM; i < M; i++) {
    //   for (let j = 0; j < floorN; j++) {
    //     let sum = 0;
    //     for (let p = 0; p < K; p++) {
    //       sum += a[i * LDA + p] *  b[p * LDB + j];
    //     }
    //     c[i * LDC + j] += sum;
    //   }
    // }
    //
    // for (let i = floorM; i < M; i++) {
    //   for (let j = floorN; j < N; j++) {
    //     let sum = 0;
    //     for (let p = 0; p < K; p++) {
    //       sum += a[i * LDA + p] *  b[p * LDB + j];
    //     }
    //     c[i * LDC + j] += sum;
    //   }
    // }

  }

  let then = new Date();
  console.log(">>> base js benchmark: ", then - now, "ms");
});