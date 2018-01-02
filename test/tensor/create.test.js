import {Tensor} from '../../src/index.js';

test('ones', function() {
  let tensor = Tensor.ones([2, 3]);
  tensorEquals(tensor, [1, 1, 1, 1, 1, 1]);
});

test('zeros', function() {
  let tensor = Tensor.zeros([2, 2]);
  tensorEquals(tensor, [0, 0, 0, 0]);
});

test('rand', function() {
  let tensor = Tensor.rand([1, 1]);
  console.log(tensor);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}