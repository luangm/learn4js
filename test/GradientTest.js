import Learn4js from '../src/index.js';
import Session from "../src/session/Session";
import {assert, expect} from 'chai';

describe('Gradient', function() {

  it('square', function() {
    let a = Learn4js.constant({name: 'A', data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let square = Learn4js.square({name: 'square', base: a});
    let gradients = Learn4js.gradients(square, [a]);

    let sess = new Session(Learn4js.activeGraph);
    let result = sess.run(gradients[0]);
    assert.deepEqual([].slice.call(result.data), [2, 4, 6, 8, 10, 12]);

  });

  it('sigmoid', function() {
    let a = Learn4js.constant({name: 'A', data: [1, 2, 3, 4], shape: [2, 2]});
    let sigmoid = Learn4js.sigmoid({name: 'sigmoid', base: a});
    let gradients = Learn4js.gradients(sigmoid, [a]);
    let sess = new Session(Learn4js.activeGraph);
    let result = sess.run(gradients[0]);
    assert.deepEqual([].slice.call(result.data), [sigmoidGrad(1), sigmoidGrad(2), sigmoidGrad(3), sigmoidGrad(4)]);
  });

});

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function sigmoidGrad(x) {
  let sigmoid = 1 / (1 + Math.exp(-x));
  return sigmoid * (1 - sigmoid);
}