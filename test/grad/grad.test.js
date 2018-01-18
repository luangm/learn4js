import Learn4js, {println} from '../../src/index';
import ReverseGradientVisitor from "../../src/visitor/ReverseGradientVisitor";
import Tensor from "../../src/core/Tensor";

test('add', function() {
  Learn4js.interactive = true;

  let node = Learn4js.parameter([[1, 2, 3, 4]]);
  println(node);
  let other = Learn4js.parameter([[5, 6, 7, 8]]);
  println(other);
  let result = Learn4js.add(node, other);
  println(result);

  let grads = Learn4js.gradients(result, [node, other]);

  let nodeGrad = grads[0];
  let otherGrad = grads[1];

  println(nodeGrad);
  println(otherGrad);

});

test('conv2d', function() {

  let imageTensor = Tensor.linspace(1, 27, 27).reshape([3, 1, 3, 3]); // N, C, H, W
  let kernelTensor = Tensor.linspace(1, 8, 8).reshape([2, 1, 2, 2]); // N C H W

  let image = Learn4js.variable({name: 'image', data: imageTensor});
  let kernel = Learn4js.variable({name: 'kernel', data: kernelTensor});

  let out = Learn4js.conv2d({name: 'conv2d', image, kernel});

  let gradVisitor = new ReverseGradientVisitor(out);
  out.accept(gradVisitor);

  let imageGrad = gradVisitor.graph.getGradient(image);
  let kernelGrad = gradVisitor.graph.getGradient(kernel);

  let sess = Learn4js.session();

  println(sess.run(image));
  println(sess.run(kernel));
  println(sess.run(out));
  println(sess.run(imageGrad));
  println(sess.run(kernelGrad));

});

test('maxpool', function() {

  let imageTensor = Tensor.linspace(1, 32, 32).reshape([2, 1, 4, 4]); // N, C, H, W
  let kernelShape = [1, 1, 2, 2];

  let image = Learn4js.variable({name: 'image', data: imageTensor});

  let maxPool = Learn4js.maxPool({name: 'maxPool', image, kernelShape});

  let square = Learn4js.square({name: 'square', base: maxPool});

  let gradVisitor = new ReverseGradientVisitor(square);
  square.accept(gradVisitor);

  let imageGrad = gradVisitor.graph.getGradient(image);

  let sess = Learn4js.session();

  println(sess.run(image));
  println(sess.run(maxPool));
  println(sess.run(square));
  println(sess.run(imageGrad));

});