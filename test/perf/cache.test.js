test('test cache', function() {

  let EPOCH = 10;
  let array = new Float32Array(64 * 1024 * 1024);
  for (let i = 0; i < array.length; i++) {
    array[i] = 1;
  }

  let now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < array.length; i++) {
      array[i] *= 3;
    }
  }

  console.log((new Date() - now), "ms");

  now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < array.length; i += 4) {
      array[i] *= 3;
      // array[i+1] *= 3;
      // array[i+2] *= 3;
      // array[i+3] *= 3;
    }
  }

  console.log((new Date() - now), "ms");

  now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < array.length; i++) {
      array[i] *= 3;
    }
  }

  console.log((new Date() - now), "ms");

  now = new Date();

  for (let k = 0; k < EPOCH; k++) {
    for (let i = 0; i < array.length; i += 4) {
      array[i] *= 3;
      // array[i+1] *= 3;
      // array[i+2] *= 3;
      // array[i+3] *= 3;
    }
  }

  console.log((new Date() - now), "ms");

});

test('test instruction cache', function() {

  let steps = 256 * 1024 * 1024;
  let a = [0, 0];

  let now = new Date();
  for (let i = 0; i < steps; i++) {
    a[0]++;
    a[0]++;
  }

  console.log((new Date() - now), "ms");
  now = new Date();

  for (let i = 0; i < steps; i++) {
    a[0]++;
    a[1]++;
  }

  console.log((new Date() - now), "ms");

});

function s() {
  let s0 = SS[0]; // Shape[0], Rows
  let s1 = SS[1]; // Shape[1], Cols
  let t0p0 = t0[0];
  let t0p1 = t0[1];
  let t1p0 = t1[0];
  let t1p1 = t1[1];
  let p0 = 0 | 0;
  let p1 = 0 | 0;

  let d0s0 = t0p1;
  let d0s1 = (t0p0 - s1 * t0p1);
  let d1s0 = t1p1;
  let d1s1 = (t1p0 - s1 * t1p1);

  for (let i = 0; i < s0; i++) {
    for (let j = 0; j < s1; j++) {
      {
        a0[p0] += a1[p1];
      }
      p0 += d0s0
      p1 += d1s0
    }
    p0 += d0s1
    p1 += d1s1
  }
}