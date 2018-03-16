import {println, Tensor} from "tensor4js";

test('library working', function() {

  let x = Tensor.create([1, 2, 3]).reshape([1, 3]);
  println(x);

});