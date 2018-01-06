import {println, Tensor} from '../../src/index.js';
import Shape from "../../src/core/Shape";

test('transpose', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [1, 2, 3]});
  println(tensor);

  // let shape = new Shape({shape: [3, 2], strides: [1, 3], order: 'c'});
  // let result = new Tensor({data: [1,2,3,4,5,6], shape});

  let result = tensor.transpose([0, 2, 1]);
  println(result);
});