import TensorUtils from "../src/core/util/TensorUtils";
import {assert, expect} from 'chai';
import Tensor from "../src/core/Tensor";
import Executor from "../src/core/executor/Executor";
import SumOp from "../src/core/op/reduction/SumOp";

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
    assert.deepEqual(result, [2, 2, 3, 4]);
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
    expect(function() {
      let result = TensorUtils.broadcastShapes(a, b);
      // console.log(result);
    }).throw();

  });

  it('reduce', function() {
    let a = new Tensor([1, 2, 3, 4, 5, 6], [2, 3]);
    // console.log(a);
    let result = new Tensor([2, 1]);
    let op = new SumOp(a, null, result);
    Executor.instance.execAtDim(op, 1);
    // console.log(result);

    let result2 = new Tensor([1, 3]);
    let op2 = new SumOp(a, null, result2);
    Executor.instance.execAtDim(op2, 0);
    // console.log(result2);
  });

  it('reduce3', function() {
    let a = new Tensor([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
    console.log(a);
    let result = new Tensor([2, 2, 1]);
    let op = new SumOp(a, null, result);
    Executor.instance.execAtDim(op, 2);
    console.log(result);

    let result2 = new Tensor([1, 2, 2]);
    let op2 = new SumOp(a, null, result2);
    Executor.instance.execAtDim(op2, 0);
    console.log(result2);

    let result3 = new Tensor([2, 1, 2]);
    let op3 = new SumOp(a, null, result3);
    Executor.instance.execAtDim(op3, 1);
    console.log(result3);
  });

});