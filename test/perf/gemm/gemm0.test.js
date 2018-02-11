test('0 - gemm baseline', function() {


  let EPOCH = 1;
  let ROWS = 1024;
  let COLS = 1024;
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

  for (let e = 0; e < EPOCH; e++) {

    for (let i = 0; i < M; i++) {
      for (let j = 0; j < N; j++) {

        let sum = c[i * LDC + j];
        for (let p = 0; p < K; p++) {
          sum += a[i * LDA + p] * b[p * LDB + j];
        }
        c[i * LDC + j] = sum;

      }
    }

  }

  let then = new Date();
  console.log(">>> base js benchmark: ", then - now, "ms");
});