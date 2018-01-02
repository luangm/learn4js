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
  // console.log(tensor);
});

test('create', function() {
  let array = [1, 2, 3, 4];
  let tensor = Tensor.create(array);
  let array2 = [[1,2],[3,4]];
  let tensor2 = Tensor.create(array2);
  let array3 = [[[1,2],[3,4],[3,4]],[[2,3],[4,5],[1,0]]];
  let tensor3 = Tensor.create(array3);
});

test('linspace', function() {
  let tensor = Tensor.linspace(0, 5.5, 12);
  console.log(tensor);
});

test('linspace bad', function() {
  let tensor = Tensor.linspace(3, 5.5, 2);
  console.log(tensor);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}