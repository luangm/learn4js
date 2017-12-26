import {Tensor} from '../src/index.js';
import TensorMath from "../src/core/TensorMath";
import TensorUtils from "../src/core/util/TensorUtils";
import {assert,expect} from 'chai';

describe('Tensor.broadcast', function() {

  it('two arrays of different size', function() {
    let a = [2, 3];
    let b = [1, 2, 1];
    let result = TensorUtils.broadcastShapes(a, b);
    assert.deepEqual(result, [1, 2, 3]);
  });

  it('two arrays of different size 2', function() {
    let a = [2, 3, 1];
    let b = [2, 1, 1, 4];
    let result = TensorUtils.broadcastShapes(a, b);
    assert.deepEqual(result, [2, 2, 3 , 4]);
  });

  it('two arrays of same size 2', function() {
    let a = [2, 1, 3, 1];
    let b = [1, 2, 3, 4];
    let result = TensorUtils.broadcastShapes(a, b);
    assert.deepEqual(result, [2, 2, 3, 4]);
  });

  it('two arrays of same size', function() {
    let a = [1, 2];
    let b = [2, 1];
    let result = TensorUtils.broadcastShapes(a, b);
    assert.deepEqual(result, [2, 2]);
  });

  it('should show error', function() {
    let a = [2, 3];
    let b = [2, 2];
    expect(function(){
      let result = TensorUtils.broadcastShapes(a, b);
      console.log(result);
    }).throw();

  });
});