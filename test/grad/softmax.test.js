import Learn4js, {println} from '../../src/index';
import ReverseGradientVisitor from "../../src/visitor/ReverseGradientVisitor";
import Tensor from "../../src/core/Tensor";

test('softmax', function() {

  let node = Learn4js.variable({name: 'node', data: [1, 2, 3, 4, 5, 6, 7, 8], shape: [2, 4]});

  let out = Learn4js.softmax({base: node});

  let initialGrad = Learn4js.constant({name: 'grad', data: [1,2,3,4,5,6,7,8], shape: [2, 4]});

  let gradVisitor = new ReverseGradientVisitor(out);
  out.accept(gradVisitor);

  let grad = gradVisitor.graph.getGradient(node);

  let sess = Learn4js.session();

  println("node", sess.run(node));
  println("out", sess.run(out));
  println("grad", sess.run(grad));

});