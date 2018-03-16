import {Tensor, println} from "tensor4js";
import {Logger, constant} from "../../src/index";

test('add with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = constant(yVal);

  let zVal = Tensor.create([[3, 4, 5], [4, 5, 6]]);

  let result = x.add(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  println(resultVal);
});

test('subtract with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[-1, 0, 1], [-2, -1, 0]]);

  let result = x.subtract(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('multiply with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[2, 4, 6], [3, 6, 9]]);

  let result = x.multiply(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('divide with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[1 / 2, 2 / 2, 3 / 2], [1 / 3, 2 / 3, 3 / 3]]);

  let result = x.divide(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);

});

test('mod with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[1 % 2, 2 % 2, 3 % 2], [1 % 3, 2 % 3, 3 % 3]]);

  let result = x.mod(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);

});

test('max with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[Math.max(1, 2), Math.max(2, 2), Math.max(3, 2)],
    [Math.max(1, 3), Math.max(2, 3), Math.max(3, 3)]]);

  let result = x.max(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);



  let X = Learn4js.variable({name: 'X'});
  let Y = Learn4js.variable({name: 'Y'});
  let Z = Learn4js.variable({name: 'Z'});
  let add1 = Learn4js.add(X, Y);
  let add2 = Learn4js.add(X, Y);
  let mul = Learn4js.multiply(add2, Z);

  assert(add1 === add2);
  assert(mul.left === add1)

});

test('min with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[Math.min(1, 2), Math.min(2, 2), Math.min(3, 2)],
    [Math.min(1, 3), Math.min(2, 3), Math.min(3, 3)]]);

  let result = x.min(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);

});