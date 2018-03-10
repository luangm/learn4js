function benchmark() {
  for (let s = 40; s <= 1000; s += 40) {
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

    let epoch = Math.floor(1024 * 1024 * 1024 / size / size / size);

    let now = new Date();

    for (let e = 0; e < epoch; e++) {
      gemmblock(a, b, c, M, N, K, size, size, size);
    }

    let diff = new Date() - now;
    let flops = 2 * M * N * K * epoch / diff / 1e6;

    console.log(size, epoch, diff, flops.toFixed(2));
  }
}

function mmult0(a, b, c, M, N, K, LDA, LDB, LDC) {

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

function mmult1(a, b, c, M, N, K, LDA, LDB, LDC) {

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      c[i * LDC + j] = addDot(a, b, c, M, N, K, LDA, LDB, LDC, i, j);
    }
  }
}


function addDot(a, b, c, M, N, K, LDA, LDB, LDC, i, j) {
  let sum = c[i * LDC + j];
  for (let l = 0; l < K; l++) {
    sum += a[i * LDA + l] * b[l * LDB + j];
  }
  return sum;
}

// 1x4 loop unroll
function gemm1x4(a, b, c, M, N, K, LDA, LDB, LDC) {

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j += 4) {

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

function gemmblock(a, b, c, M, N, K, LDA, LDB, LDC) {
  let kc = 128;
  let mc = 128;

  for (let p = 0; p < K; p += kc) {
    let pb = Math.min(K - p, kc);
    for (let i = 0; i < M; i += mc) {
      let ib = Math.min(M - i, mc);
      gemm4x4(a, b, c, ib, N, pb, LDA, LDB, LDC);
    }
  }
}

function gemm4x4(a, b, c, M, N, K, LDA, LDB, LDC) {
  for (let i = 0; i < M; i += 4) {
    for (let j = 0; j < N; j += 4) {

      let sums = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      for (let p = 0; p < K; p++) {
        let ai = i * LDA + p;
        let a0 = a[ai];
        let a1 = a[ai + LDA];
        let a2 = a[ai + 2 * LDA];
        let a3 = a[ai + 3 * LDA];

        let bi = p * LDB + j;
        let b0 = b[bi];
        let b1 = b[bi + 1];
        let b2 = b[bi + 2];
        let b3 = b[bi + 3];

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

      let c1 = i * LDC + j;
      let c2 = c1 + LDC;
      let c3 = c2 + LDC;
      let c4 = c3 + LDC;
      c[c1] += sums[0];
      c[c1 + 1] += sums[1];
      c[c1 + 2] += sums[2];
      c[c1 + 3] += sums[3];
      c[c2] += sums[4];
      c[c2 + 1] += sums[5];
      c[c2 + 2] += sums[6];
      c[c2 + 3] += sums[7];
      c[c3] += sums[8];
      c[c3 + 1] += sums[9];
      c[c3 + 2] += sums[10];
      c[c3 + 3] += sums[11];
      c[c4] += sums[12];
      c[c4 + 1] += sums[13];
      c[c4 + 2] += sums[14];
      c[c4 + 3] += sums[15];
    }
  }
}

function gemm4x4O1(a, b, c, M, N, K, LDA, LDB, LDC) {
  for (let i = 0; i < M; i += 4) {
    for (let j = 0; j < N; j += 4) {

      let sum00 = 0, sum01 = 0, sum02 = 0, sum03 = 0,
        sum10 = 0, sum11 = 0, sum12 = 0, sum13 = 0,
        sum20 = 0, sum21 = 0, sum22 = 0, sum23 = 0,
        sum30 = 0, sum31 = 0, sum32 = 0, sum33 = 0;

      let a0ptr = (i * LDA) | 0;
      let a1ptr = (a0ptr + LDA) | 0;
      let a2ptr = (a1ptr + LDA) | 0;
      let a3ptr = (a2ptr + LDA) | 0;

      for (let p = 0; p < K; p++) {
        let a0 = a[a0ptr];
        let a1 = a[a1ptr];
        let a2 = a[a2ptr];
        let a3 = a[a3ptr];

        a0ptr++;
        a1ptr++;
        a2ptr++;
        a3ptr++;

        let bi = p * LDB + j;
        let b0 = b[bi];
        let b1 = b[bi + 1];
        let b2 = b[bi + 2];
        let b3 = b[bi + 3];

        sum00 += a0 * b0;
        sum01 += a0 * b1;
        sum02 += a0 * b2;
        sum03 += a0 * b3;
        sum10 += a1 * b0;
        sum11 += a1 * b1;
        sum12 += a1 * b2;
        sum13 += a1 * b3;
        sum20 += a2 * b0;
        sum21 += a2 * b1;
        sum22 += a2 * b2;
        sum23 += a2 * b3;
        sum30 += a3 * b0;
        sum31 += a3 * b1;
        sum32 += a3 * b2;
        sum33 += a3 * b3;
      }

      let c1 = i * LDC + j;
      let c2 = c1 + LDC;
      let c3 = c2 + LDC;
      let c4 = c3 + LDC;
      c[c1] += sum00;
      c[c1 + 1] += sum01;
      c[c1 + 2] += sum02;
      c[c1 + 3] += sum03;
      c[c2] += sum10;
      c[c2 + 1] += sum11;
      c[c2 + 2] += sum12;
      c[c2 + 3] += sum13;
      c[c3] += sum20;
      c[c3 + 1] += sum21;
      c[c3 + 2] += sum22;
      c[c3 + 3] += sum23;
      c[c4] += sum30;
      c[c4 + 1] += sum31;
      c[c4 + 2] += sum32;
      c[c4 + 3] += sum33;
    }
  }
}

benchmark();