import {Tensor} from '../../src/index.js';
import {println} from "../../src/index";
import TensorMath from "../../src/core/TensorMath";
import ShapeUtils from "../../src/core/util/ShapeUtils";

test('add', function() {
  let a = new Tensor({data: [1, 2, 3, 4, 5, 6], shape: [2, 1, 3]});
  let ab = a.broadcast([2, 2, 3]);
  println(ab);
  let b = new Tensor({data: [2, 3, 4, 5, 6, 7], shape: [1, 2, 3]});
  let bb = b.broadcast([2, 2, 3]);
  println(bb);
  let result = TensorMath.add(a, b);
  println(result);
  let result2 = TensorMath.add(ab, bb);
  println(result2);
});


test('broadcast shape', function() {
  let a = [2, 3];
  let b = [2, 3, 1, 1];
  let result = ShapeUtils.broadcastShapes(a, b);
  println(result);

  let broadA = ShapeUtils.getBroadcastedDimensions(a, result);
  println(broadA);

  let broadB = ShapeUtils.getBroadcastedDimensions(b, result);
  println(broadB);
});