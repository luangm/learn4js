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
    this._gradVisitor = new ReverseGradientVisitor();
    this._depVisitor = new DependencyVisitor();
  }

  get learnRate() {
    return this._learnRate;
  }

  minimize(loss) {
    loss.accept(this._depVisitor);
    loss.accept(this._gradVisitor);

    this.graph._subGraphs[loss.id] = this._gradVisitor.graph;

    let assignList = [];

    for (let node of Object.values(this._depVisitor.dependencies)) {
      if (node instanceof Parameter) {
        let grad = this._gradVisitor.graph.getGradient(node);
        let step = new GradientDescentStep(node, grad, {learnRate: this.learnRate});
        assignList.push(step);
      }
    }

    return new Group(assignList);
  }
}