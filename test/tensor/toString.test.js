import {Tensor, println} from '../../src/index.js';

test('toString', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16], shape: [2, 2, 2, 2]});
  println(tensor);
});

test('vector', function() {
  let tensor = new Tensor({data: [1, 2, 3], shape: [3]});
  println(tensor);
});