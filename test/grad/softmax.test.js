import Learn4js, {println} from '../../src/index';
import ReverseGradientVisitor from "../../src/visitor/ReverseGradientVisitor";

test('softmax', function() {

  let node = Learn4js.parameter([[1, 2, 3], [4, 5, 6]]);
  let out = Learn4js.softmax(node);

  let gradVisitor = new ReverseGradientVisitor(Learn4js.activeGraph);
  gradVisitor.visit(out);

  let grad = out.getGradient(node);

  println(node.eval());
  println(out.eval());
  println(grad.eval());


  // let grad = gradVisitor.graph.getGradient(node);
  //
  // let sess = Learn4js.session();
  //
  // println("node", sess.run(node));
  // println("out", sess.run(out));
  // println("grad", sess.run(grad));

});