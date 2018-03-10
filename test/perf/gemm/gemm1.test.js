test('1 - gemm 1x4', function() {


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
      for (let j = 0; j < N; j+=4) {

        let sum0 = c[i * LDC + j];
        let sum1 = c[i * LDC + j + 1];
        let sum2 = c[i * LDC + j + 2];
        let sum3 = c[i * LDC + j + 3];


        for (let p = 0; p < K; p++) {
          let ap = a[i * LDA + p];
          let offsetB = p * LDB + j;

          sum0 += ap * b[offsetB];
          sum1 += ap * b[offsetB + 1];
          sum2 += ap * b[offsetB + 2];
          sum3 += ap * b[offsetB + 3];
        }

        c[i * LDC + j] = sum0;
        c[i * LDC + j + 1] = sum1;
        c[i * LDC + j + 2] = sum2;
        c[i * LDC + j + 3] = sum3;
      }
    }

  }

  let then = new Date();
  console.log(">>> base js benchmark: ", then - now, "ms");
});