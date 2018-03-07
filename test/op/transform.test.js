import Learn4js, {Logger, Tensor} from "../../src/index";

test('abs', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[-1, 2, -3], [-4, -5, 6]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create([[1, 2, 3], [4, 5, 6]]);

  let result = x.abs();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('sin', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.sin(1), Math.sin(2), Math.sin(3)],
      [Math.sin(0), Math.sin(9), Math.sin(8)]]
  );

  let result = x.sin();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('cos', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.cos(1), Math.cos(2), Math.cos(3)],
      [Math.cos(0), Math.cos(9), Math.cos(8)]]
  );

  let result = x.cos();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('tan', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.tan(1), Math.tan(2), Math.tan(3)],
      [Math.tan(0), Math.tan(9), Math.tan(8)]]
  );

  let result = x.tan();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('tanh', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.tanh(1), Math.tanh(2), Math.tanh(3)],
      [Math.tanh(0), Math.tanh(9), Math.tanh(8)]]
  );

  let result = x.tanh();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('exp', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.exp(1), Math.exp(2), Math.exp(3)],
      [Math.exp(0), Math.exp(9), Math.exp(8)]]
  );

  let result = x.exp();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('expm1', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.exp(1) - 1, Math.exp(2) - 1, Math.exp(3) - 1],
      [Math.exp(0) - 1, Math.exp(9) - 1, Math.exp(8) - 1]]
  );

  let result = x.expm1();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});


test('log', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.log(1), Math.log(2), Math.log(3)],
      [Math.log(0), Math.log(9), Math.log(8)]]
  );

  let result = x.log();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('square', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[1*1, 2*2, 3*3],
      [0*0, 9*9, 8*8]]
  );

  let result = x.square();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('sqrt', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[Math.sqrt(1), Math.sqrt(2), Math.sqrt(3)],
      [Math.sqrt(0), Math.sqrt(9), Math.sqrt(8)]]
  );

  let result = x.sqrt();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('rsqrt', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[1, 2, 3], [0.01, 9, 8]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[1 / Math.sqrt(1), 1 / Math.sqrt(2), 1 / Math.sqrt(3)],
      [1 /Math.sqrt(0.01),1 / Math.sqrt(9), 1 / Math.sqrt(8)]]
  );

  let result = x.rsqrt();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('step', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[-1, -2, 3], [0, -1, 1]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[0, 0, 1],
      [0, 0, 1]]
  );

  let result = x.step();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('sign', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[-1, -2, 3], [0, -1, 1]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[-1, -1, 1],
      [0, -1, 1]]
  );

  let result = x.sign();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('negate', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[-1, -2, 3], [0, -1, 1]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[1, 2, -3],
      [-0, 1, -1]]
  );

  let result = x.negate();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('reciprocal', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[-1, -2, 3], [0, -1, 1]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[1/-1, 1/-2, 1/3],
      [1/0, 1/-1, 1]]
  );

  let result = x.reciprocal();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});

test('round', function() {

  // Logger.LogLevel = Logger.Level.ERROR;

  let xVal = Tensor.create([[-1.1, -2.2, 3.1], [0.01, -1.1, 1.009]]);
  let x = Learn4js.constant(xVal);

  let zVal = Tensor.create(
    [[-1, -2, 3],
    [0, -1, 1]]
  );

  let result = x.round();
  let resultVal = result.value;

  expect(resultVal).toEqual(zVal);
  // println(resultVal);
});