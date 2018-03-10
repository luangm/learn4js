function gemm0() {

  // let SIZES = [4, 8, 16, 32, 40, 80, 128, 160, 200, 240, 280, 320, 360, 400, 440, 480, 512, 560, 600, 700, 800, 900, 1024];
  let EPOCH = 1;

  for (let s = 4; s < 1000; s+=4) {
    let size = s;
    let M = size;
    let N = size;
    let K = size;

    let a = []; // A = M * K
    let b = []; // B = K * N
    let c = []; // C = M * N

    for (let d = 0; d < size * size; d++) {
      a.push(Math.random());
      b.push(Math.random());
      c.push(0);
    }

    let epoch = Math.floor(4 * 1024 * 1024 * 1024 / size / size / size);

    let now = new Date();

    for (let e = 0; e < epoch; e++) {
      mm(a, b, c, M, N, K, size, size, size);
    }

    let diff = new Date() - now;
    let flops = 2 * M * N * K * epoch / diff / 1e6;

    console.log(size, epoch, diff, flops.toFixed(2));
  }
}

function mm(a, b, c, M, N, K, LDA, LDB, LDC) {

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      let sum = c[i * LDC + j];
      for (let l = 0; l < K; l++) {
        sum += a[i * LDA + l] * b[l * LDB + j];
      }
      c[i * LDC + j] = sum;
    }
  }
}

gemm0();