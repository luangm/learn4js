import {Tensor} from '../src/index.js';
import Blas from "../src/core/blas/Blas";

describe('Blas', function() {

  it('gemm', function() {
    let A = [[1, 2],
             [3, 4]];
    let B = [[2, 3],
             [4, 5]];
    let C = [[0, 0], [0, 0]];

    let blas = new Blas();
    blas.gemm(false, false, 2, 2, 2, 1, A, null, B, null, 0, C, null);
    console.log(C);
  });

});