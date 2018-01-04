import {println, Tensor} from '../../src/index.js';

test('transpose', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  println(tensor);

  let trans = tensor.transpose();
  println(trans);
});