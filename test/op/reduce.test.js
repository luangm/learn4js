import {constant, create, Logger, reduceSum} from "../../src/index";

test('sum all', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x = constant([[1, 2, 3], [4, 5, 6]]);
  let z = reduceSum(x);
  let expected = create(21);

  expect(z.value).toEqual(expected);
});

test('sum 0', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x = constant([[1, 2, 3], [4, 5, 6]]);
  let z = reduceSum(x, 0);
  let expected = create([5, 7, 9]);

  expect(z.value).toEqual(expected);
});

test('sum [0,1]', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x = constant([[1, 2, 3], [4, 5, 6]]);
  let z = reduceSum(x, [0, 1]);
  let expected = create(21);

  expect(z.value).toEqual(expected);
});

test('3D sum all', function() {

  Logger.LogLevel = Logger.Level.ERROR;

  let x = constant([[[1, 2, 3], [4, 5, 6]]]);
  let z = reduceSum(x);
  let expected = create(21);
  expect(z.value).toEqual(expected);

});