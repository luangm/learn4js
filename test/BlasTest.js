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

  it('test', function() {

    class Test {
      constructor(data) {
        let self = this;
        this.data = data;
        this.foo = 'bar';

        return new Proxy(this, {
          get(target, prop) {
            if (Number(prop) == prop && !(prop in target)) {
              return self.data[prop];
            }
            return target[prop];
          }
        });
      }
    }

    var test = new Test([1,2,3]);
    console.log(test[0]); // should log 1
    console.log(test.foo); // should log 'bar'
    console.log(test);
  });

});