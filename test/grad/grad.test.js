import Learn4js, {println} from '../../src/index';
import GradientDescentOptimizer from "../../src/optimizer/GradientDescentOptimizer";
import ReverseGradientVisitor from "../../src/visitor/ReverseGradientVisitor";

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