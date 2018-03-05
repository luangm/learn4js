import Learn4js, {println, Tensor} from "../../src/index";

test('add', function() {
  let x = Learn4js.constant(Tensor.create([[1, 2, 3], [4, 5, 6]]).reshape([2, 1, 3]));
  let y = Learn4js.constant(Tensor.create([[2, 3, 4], [5, 6, 7]]).reshape([1, 2, 3]));
  let result = Learn4js.add(x, y);
  result.eval();
  println(result);
});