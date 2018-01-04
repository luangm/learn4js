import {println, Tensor} from '../../src/index.js';

test('slice', function() {
  let tensor = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [1, 3]});
  console.log(tensor);
  console.log(tensor.get([0, 0]), tensor.get([0, 1]), tensor.get([0, 2]));
  console.log(tensor.length);
  console.log(tensor.slices);

  let slice1 = tensor.slice(0);
  let slice2 = tensor.slice(1);
  console.log(slice1);
  console.log(slice1.rank, slice1.get([0]), slice1.get([1]));
  console.log(slice2);
  console.log(slice2.rank, slice2.get([0]), slice2.get([1]));

  let slice23 = slice2.slice(2);
  console.log(slice23, slice23.get([]), slice23.rank, slice23.isScalar);
  println(tensor);
});