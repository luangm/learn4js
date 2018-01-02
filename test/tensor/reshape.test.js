import {Tensor} from '../../src/index.js';

test('reshape1', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6, 7, 8, 9], shape: [1, 9]});
  let result = a.reshape([3, 3]);
  // console.log(result);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}