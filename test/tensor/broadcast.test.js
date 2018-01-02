import {Tensor} from '../../src/index.js';

test('broadcast', function() {
  let left = new Tensor({data: [1, 2, 3, 4], shape: [4, 1]});
  let result = left.broadcast([4, 3]);
  tensorEquals(result, [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}