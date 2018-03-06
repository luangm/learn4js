import Learn4js, {println, Tensor} from "../../src/index";

test('add', function() {

  let xVal = Tensor.create([[1, 2, 3], [4, 5, 6]]).reshape([2, 1, 3]);
  let x = Learn4js.constant(xVal);

  let yVal = Tensor.create([[2, 3, 4], [5, 6, 7]]).reshape([1, 2, 3]);
  let y = Learn4js.constant(yVal);

  println(x.value);
  println(Learn4js.activeGraph);
  println(Learn4js.activeSession);

  let add = x.add(y);
  println(add);
  println(add.value);

  let exp = x.exp();
  println(exp);

});