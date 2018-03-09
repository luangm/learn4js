import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";
import TensorMath from "../../src/core/TensorMath";
import ShapeUtils from "../../src/core/util/ShapeUtils";

test('add with broadcast', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 1, 3]});
  let ab = a.broadcast([2, 2, 3]);
  let b = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [1, 2, 3]});
  let bb = b.broadcast([2, 2, 3]);
  let result = TensorMath.add(a, b);
  // let result2 = TensorMath.add(ab, bb);

  // expect(result).toEqual(result2);
  println(result);
});

test('add with broadcast2', function() {
  let a = new Tensor({data: [1, 2, 3], shape: [1, 3]});
  let b = new Tensor({data: [2, 3], shape: [2, 1]});
  let result = TensorMath.add(a, b);
  println(result);
});

test('add with broadcast3', function() {
  let a = new Tensor({data: [1, 2, 3, 4], shape: [2, 2]});
  let b = new Tensor({data: [2, 3, 4, 5], shape: [2, 2]});
  let result = TensorMath.add(a, b);
  println(result);
});