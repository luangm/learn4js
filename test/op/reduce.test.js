import {Tensor, TensorMath} from "tensor4js";
import {constant, Logger, reduceSum} from "../../src/index";

test('sum all', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x = constant([[1, 2, 3], [4, 5, 6]]);
  let z = reduceSum(x);
  let expected = Tensor.create(21);

  expect(z.value).toEqual(expected);
});

test('sum 0', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x = constant([[1, 2, 3], [4, 5, 6]]);
  let z = reduceSum(x, 0);
  let expected = Tensor.create([5, 7, 9]);

  expect(z.value).toEqual(expected);
});

test('sum 1', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);
  let x = constant(xVal);

  let zVal = Tensor.create([[6], [15]]);

  let result = TensorMath.reduceSum(xVal, 1);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
});

test('sum [0,1]', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);
  let x = constant(xVal);

  let zVal = Tensor.create([[21]]);
  // console.log(zVal);

  let result = TensorMath.reduceSum(xVal, [0, 1]);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
});

test('3D sum all', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]).reshape([1, 2, 3]);
  let x = constant(xVal);

  let zVal = Tensor.create([[[21]]]);
  // console.log(zVal);

  let result = TensorMath.reduceSum(xVal);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
});