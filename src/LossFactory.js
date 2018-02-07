import Session from "./session/Session";
import Graph from "./structure/Graph";
import Subtract from "./structure/node/binary/Subtract";
import ReduceSum from "./structure/node/reduction/ReduceSum";
import SoftmaxCrossEntropy from "./structure/node/SoftmaxCrossEntropy";
import Square from "./structure/node/transform/Square";

/**
 * This is a convenience for Loss functions
 * The quick reference is Learn4js.loss
 */
class LossFactory {

  constructor(interactive) {
    this._interactive = interactive;
  }

  get activeGraph() {
    return Graph.active;
  }

  set activeGraph(value) {
    Graph.active = value;
  }

  get activeSession() {
    return Session.active;
  }

  set activeSession(value) {
    Session.active = value;
  }

  get interactive() {
    return this._interactive;
  }

  set interactive(value) {
    this._interactive = value;
  }

  add(node) {
    node = this.activeGraph.add(node);
    if (this.interactive) {
      node.eval();
    }
    return node;
  }

  meanSquaredError(label, prediction, {name} = {}) {
    return null;
  }

  softmaxCrossEntropy(labels, logits, {name} = {}) {
    return this.add(new SoftmaxCrossEntropy(labels, logits, {name}));
  }

  sumSquaredError(label, prediction, {name} = {}) {
    let diff = this.add(new Subtract(label, prediction));
    let square = this.add(new Square(diff));
    return this.add(new ReduceSum(square, {name}));
  }
}

export default new LossFactory(false);