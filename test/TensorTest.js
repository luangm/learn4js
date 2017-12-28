import {Tensor} from '../src/index.js';
import TensorMath from "../src/core/util/TensorMath";
import {assert} from 'chai';

describe('Tensor', function() {

  it('add', function() {
    let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
    let result = tensor.add(tensor2);
    assert.deepEqual([].slice.call(result.data), [3, 5, 7, 9, 11, 13]);
  });

  // FAIL
  it('should broadcast', function() {
    let left = new Tensor({data: [1, 2, 3, 4], shape: [4, 1]});
    let result = left.broadcast([4, 3]);


    // console.log(result.get([0, 1, 1]));
    // let result = left.broadcast([2,2]);
    // console.log(result);
    // assert.deepEqual([].slice.call(result.data), [4, 5, 6, 5, 6, 7]);
  });

  // TODO: BUG
  it('add should broadcast', function() {
    let left = new Tensor({data: [1, 2, 3], shape: [1, 3]});
    let right = new Tensor({data: [3, 4], shape: [2, 1]});
    let result = TensorMath.add(left, right);
    // console.log(result);
    // assert.deepEqual(result.shape, [2,3]);
    // assert.deepEqual([].slice.call(result.data), [4, 5, 6, 5, 6, 7]);
  });

  it('addi', function() {
    let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
    let result = tensor.addi(tensor2);
    // console.log(result);
  });

  it('mmul', function() {
    let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [3, 2]});
    let result = tensor.matmul(tensor2);
    // console.log(result);
  });

  it('multiply', function() {
    let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
    let result = tensor.multiply(tensor2);
    // console.log(result);
  });

  it('divide', function() {
    let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
    let result = tensor.divide(tensor2);
    // console.log(result);
  });

  it('subtract', function() {
    let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
    let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
    let result = tensor.subtract(tensor2);
    // console.log(result);
  });

  it('reshape1', function() {
    let a = new Tensor({data: [1, 2, 3, 4, 5, 6, 7, 8, 9], shape: [1, 9]});
    let result = a.reshape([3, 3]);
    // console.log(result);
  });
});