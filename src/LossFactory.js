import ComputeGraph from "./structure/ComputeGraph";
import Constant from "./structure/node/Constant";
import Add from "./structure/node/Add";
import MatMul from "./structure/node/MatMul";
import Sigmoid from "./structure/node/Sigmoid";
import Subtract from "./structure/node/Subtract";
import Square from "./structure/node/Square";
import ReduceSum from "./structure/node/ReduceSum";
import ReverseGradientVisitor from "./visitor/ReverseGradientVisitor";
import Fill from "./structure/node/Fill";
import Negate from "./structure/node/Negate";
import Multiply from "./structure/node/Multiply";
import Assign from "./structure/node/Assign";
import Parameter from "./structure/node/Parameter";
import Variable from "./structure/node/Variable";
import Session from "./session/Session";
import Sine from "./structure/node/Sine";
import Cosine from "./structure/node/Cosine";
import Tangent from "./structure/node/Tangent";
import Exponential from "./structure/node/Exponential";
import SquareRoot from "./structure/node/SquareRoot";
import Absolute from "./structure/node/Absolute";
import Logarithm from "./structure/node/Logarithm";
import Conv2d from "./structure/node/Conv2d";
import MaxPool from "./structure/node/MaxPool";
import Softmax from "./structure/node/Softmax";
import MeanSquaredError from "./structure/node/MeanSquaredError";
import SumSquaredError from "./structure/node/SumSquaredError";

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

  meanSquaredError(label, prediction, {name} = {}) {
    return this._addOrGet(new MeanSquaredError(label, prediction, {name}));
  }

  sumSquaredError(label, prediction, {name} = {}) {
    return this._addOrGet(new SumSquaredError(label, prediction, {name}));
  }

  _addOrGet(node) {
    let existing = this.activeGraph.findNode(node.type, node.params);
    if (existing) {
      if (this.interactive) {
        existing.eval();
      }
      return existing;
    }
    this.activeGraph.add(node);
    if (this.interactive) {
      node.eval();
    }
    return node;
  }
}

export default new LossFactory(false);