import Learn4js, {println, Tensor} from "../../src/index";

test('subtract', function() {
  let x = Learn4js.constant(Tensor.create([[1, 2, 3], [4, 5, 6]]));
  let y = Learn4js.constant(Tensor.create([[2, 3, 2], [3, 1, 5]]));
  let result = Learn4js.subtract(x, y);
  result.eval();
  println(result);
});