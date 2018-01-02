import {Tensor} from '../../src/index.js';

test('add', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.add(tensor2);
  tensorEquals(result, [3, 5, 7, 9, 11, 13]);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}