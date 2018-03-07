import Learn4js, {Logger, println, Tensor} from "../../src/index";
import TensorMath from "../../src/core/TensorMath";

test('sum all', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create([[21]]);
  // console.log(zVal);

  let result = TensorMath.reduceSum(xVal);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
  println(resultVal);
});

test('sum 0', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create([[5, 7, 9]]);
  // console.log(zVal);

  let result = TensorMath.reduceSum(xVal, 0);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
  println(resultVal);
});

test('sum 1', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create([[6], [15]]);

  let result = TensorMath.reduceSum(xVal, 1);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
  println(resultVal);
});

test('sum [0,1]', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create([[21]]);
  // console.log(zVal);

  let result = TensorMath.reduceSum(xVal, [0, 1]);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
  println(resultVal);
});

test('3D sum all', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]).reshape([1, 2, 3]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create([[[21]]]);
  // console.log(zVal);

  let result = TensorMath.reduceSum(xVal);
  let resultVal = result;

  expect(resultVal).toEqual(zVal);
  println(resultVal);
});