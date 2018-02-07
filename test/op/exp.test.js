import Learn4js, {println, Tensor} from "../../src/index";

test('exp', function() {
  let x = Learn4js.constant(Tensor.create([[1, 2, 3], [4, 5, 6]]));
  let result = Learn4js.exp(x);
  result.eval();
  println(result);
});