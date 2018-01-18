import ComputeGraph from "./structure/ComputeGraph";
import Session from "./session/Session";
import Subtract from "./structure/node/Subtract";
import Square from "./structure/node/Square";
import ReduceSum from "./structure/node/ReduceSum";
import SoftmaxCrossEntropy from "./structure/node/SoftmaxCrossEntropy";

/**
 * This is a convenience for Loss functions
 * The quick reference is Learn4js.loss
 */
class LossFactory {

  constructor(interactive) {
    this._interactive = interactive;
  }

  get activeGraph() {
    return ComputeGraph.active;
  }

  set activeGraph(value) {
    ComputeGraph.active = value;
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