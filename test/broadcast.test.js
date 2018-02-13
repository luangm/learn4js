import TensorUtils from "../src/core/util/TensorUtils";
import Tensor from "../src/core/Tensor";
import Executor from "../src/core/executor/Executor";
import SumOp from "../src/core/op/reduction/SumOp";

test('console_log', function() {
  let a = Tensor.create([1, 2, 3]);
  console.log(a);
});

test('two arrays of different size', function() {
  let a = [2, 3];
  let b = [1, 2, 1];
  let result = TensorUtils.broadcastShapes(a, b);
  expect(result).toEqual([1, 2, 3]);
});

test('two arrays of different size 2', function() {
  let a = [2, 3, 1];
  let b = [2, 1, 1, 4];
  let result = TensorUtils.broadcastShapes(a, b);
  expect(result).toEqual([2, 2, 3, 4]);
});

test('two arrays of same size 2', function() {
  let a = [2, 1, 3, 1];
  let b = [1, 2, 3, 4];
  let result = TensorUtils.broadcastShapes(a, b);
  expect(result).toEqual([2, 2, 3, 4]);
});

test('two arrays of same size', function() {
  let a = [1, 2];
  let b = [2, 1];
  let result = TensorUtils.broadcastShapes(a, b);
  expect(result).toEqual([2, 2]);
});

test('should show error', function() {
  let a = [2, 3];
  let b = [2, 2];
  expect(function() {
    let result = TensorUtils.broadcastShapes(a, b);
    // console.log(result);
  }).toThrow();

});

test('reduce', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  // console.log(a);
  let result = new Tensor({shape: [2, 1]});
  let op = new SumOp(a, null, result);
  Executor.instance.execAtDim(op, 1);
  // console.log(result);

  let result2 = new Tensor({shape: [1, 3]});
  let op2 = new SumOp(a, null, result2);
  Executor.instance.execAtDim(op2, 0);
  // console.log(result2);
});

test('reduce3', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6, 7, 8], shape: [2, 2, 2]});
  // console.log(a);
  let result = new Tensor({shape: [2, 2, 1]});
  let op = new SumOp(a, null, result);
  Executor.instance.execAtDim(op, 2);
  // console.log(result);

  let result2 = new Tensor({shape: [1, 2, 2]});
  let op2 = new SumOp(a, null, result2);
  Executor.instance.execAtDim(op2, 0);
  // console.log(result2);

  let result3 = new Tensor({shape: [2, 1, 2]});
  let op3 = new SumOp(a, null, result3);
  Executor.instance.execAtDim(op3, 1);
  // console.log(result3);
});


test('tensor broadcast', function() {
  let a = new Tensor({data: [1, 2], shape: [1, 2]});
  let result = a.broadcast([3, 2]);
  expect([].slice.call(result.data)).toEqual([1, 2, 1, 2, 1, 2]);

  let b = new Tensor({data: [1, 2], shape: [2, 1]});
  let result2 = b.broadcast([2, 3]);
  expect([].slice.call(result2.data)).toEqual([1, 1, 1, 2, 2, 2]);
});

test('tensor broadcast different dims', function() {
  let a = new Tensor({data: [1, 2], shape: [1, 2]});
  let result = a.broadcast([2, 3, 2]);
  // console.log(result);
  expect([].slice.call(result.data)).toEqual([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);

  let b = new Tensor({data: [1, 2], shape: [2, 1]});
  let result2 = b.broadcast([2, 2, 3]);
  expect([].slice.call(result2.data)).toEqual([1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2]);
});