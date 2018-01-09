import Learn4js, {println} from '../../src/index';
import ReverseGradientVisitor from "../../src/visitor/ReverseGradientVisitor";
import Tensor from "../../src/core/Tensor";

test('sin', function() {

  let data = [1, 2, 3, 4];

  let node = Learn4js.variable({name: 'node', data: data, shape: [data.length]});

  let out = Learn4js.log({base: node});

  let gradVisitor = new ReverseGradientVisitor(out);
  out.accept(gradVisitor);

  let grad = gradVisitor.graph.getGradient(node);

  let sess = Learn4js.session();

  println(sess.run(node));
  println(sess.run(out));
  println(sess.run(grad));

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