import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";

test('add', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.add(tensor2);
  println(result);
  println(tensor);
});

test('addi', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 3]});
  let tensor2 = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [2, 3]});
  let result = tensor.addi(tensor2);
  println(result);
  println(tensor);
});

function tensorEquals(result, data) {
  expect([].slice.call(result.data)).toEqual(data);
}