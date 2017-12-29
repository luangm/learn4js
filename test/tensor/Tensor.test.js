import {Tensor} from '../../src/index.js';
import TensorMath from "../../src/core/util/TensorMath";

test('add', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.add(tensor2);
  tensorEquals(result, [3, 5, 7, 9, 11, 13]);
});

test('should broadcast', function() {
  let left = new Tensor({data: [1, 2, 3, 4], shape: [4, 1]});
  let result = left.broadcast([4, 3]);
  tensorEquals(result, [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]);
});

test('add should broadcast', function() {
  let left = new Tensor({data: [1, 2, 3], shape: [1, 3]});
  let right = new Tensor({data: [3, 4], shape: [2, 1]});
  let result = TensorMath.add(left, right);
  tensorEquals(result, [4, 5, 6, 5, 6, 7]);
});

test('addi', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.addi(tensor2);
  // console.log(result);
});

test('mmul', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [3, 2]});
  let result = tensor.matmul(tensor2);
  // console.log(result);
});

test('multiply', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.multiply(tensor2);
  // console.log(result);
});

test('divide', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.divide(tensor2);
  // console.log(result);
});

test('subtract', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.subtract(tensor2);
  // console.log(result);
});

test('reshape1', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6, 7, 8, 9], shape: [1, 9]});
  let result = a.reshape([3, 3]);
  // console.log(result);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}