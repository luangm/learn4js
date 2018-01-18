import DependencyVisitor from "../visitor/DependencyVisitor";
import ReverseGradientVisitor from "../visitor/ReverseGradientVisitor";
import Parameter from "../structure/node/Parameter";
import Optimizer from "./Optimizer";
import GradientDescentStep from "./GradientDescentStep";
import Group from "../structure/node/Group";

export default class GradientDescentOptimizer extends Optimizer {

  constructor({graph, learnRate = 0.001}) {
    super({graph});
    this._learnRate = learnRate;
  }

  get learnRate() {
    return this._learnRate;
  }

  minimize(loss) {
    let depVisitor = new DependencyVisitor();
    loss.accept(depVisitor);
    let paramNodes = [];
    for (let node of Object.values(depVisitor.dependencies)) {
      if (node instanceof Parameter) {
        paramNodes.push(node);
      }
    }

    // If the loss function already has gradients, no need to rebuild it.
    if (!loss.gradientMap) {
      let gradVisitor = new ReverseGradientVisitor(this.graph, loss);
      loss.accept(gradVisitor);
    }

    let assignList = [];
    for (let node of paramNodes) {
      let grads = loss.getGradients(node); // Grad is a list of gradient nodes.
      let step = this.graph.add(new GradientDescentStep(node, grads, {learnRate: this.learnRate}));
      assignList.push(step);
    }

    return this.graph.add(new Group(assignList));
  }
}