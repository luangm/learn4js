import Learn4js, {Logger, println, Tensor} from "../../src/index";

test('add with broadcast', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([1, 2, 3]).reshape([1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([2, 3]).reshape([2, 1]);
  let y = Learn4js.constant(yVal);

  let zVal = Tensor.create([[3, 4, 5], [4, 5, 6]]);

  let result = x.add(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
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

  let zVal = Tensor.create([[1/2, 2/2, 3/2], [1/3, 2/3, 3/3]]);

  let result = x.divide(y);
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);

});