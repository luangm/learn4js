import weblas from 'weblas';

test('sgemm', function() {
  var h1 = 1024, w1 = 1024,
    h2 = 1024, w2 = 1024;

  var A = new Float32Array(h1 * w1);
  var B = new Float32Array(h2 * w2);

// fill A and B with science

  var M = h1,
    N = w2,
    K = h2; // must match w1

  var alpha = 1.0;
  var beta = 0.0;
  var C = new Float32Array(w2)      // specialized for neural net bias calculation

  console.log(weblas);
// result will contain matrix multiply of A x B (times alpha)
//  let result = weblas.sgemm(M, N, K, alpha, A, B, beta, C);
});