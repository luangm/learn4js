import {Tensor} from '../src/index.js';
import TensorMath from "../src/core/TensorMath";
import TensorUtils from "../src/core/util/TensorUtils";
import {assert} from 'chai';

describe('Tensor', function() {

  it('add', function() {
    let tensor = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    let tensor2 = new Tensor([2, 3, 4, 5, 6, 7], [2, 3]);
    let result = tensor.add(tensor2);
    // console.log(result);
  });

  it('add should broadcast', function() {
    let left = new Tensor([1, 2, 3], [1, 3]);
    let right = new Tensor([3, 4], [2, 1]);
    let result = TensorMath.add(left, right);
    // console.log(result);
  });

  it('addi', function() {
    let tensor = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    let tensor2 = new Tensor([2, 3, 4, 5, 6, 7], [2, 3]);
    let result = tensor.addi(tensor2);
    // console.log(result);
  });

  it('mmul', function() {
    let tensor = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    let tensor2 = new Tensor([2, 3, 4, 5, 6, 7], [3, 2]);
    let result = tensor.mmul(tensor2);
    // console.log(result);
  });
});