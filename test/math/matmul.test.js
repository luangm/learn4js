import {println, Tensor} from '../../src/index';

test('matmul', function() {

  let a = Tensor.create([[1, 2, 3], [4, 5, 6]]); // 2x3
  let b = Tensor.create([[1], [2], [3]]); // 3x1

  let z = a.matmul(b); // 2x1
  println(z);

  let expected = Tensor.create([[14], [32]]);

  expect(z).toEqual(expected);

});
