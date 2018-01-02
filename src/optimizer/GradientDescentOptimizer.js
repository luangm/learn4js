import DependencyVisitor from "../visitor/DependencyVisitor";
import ReverseGradientVisitor from "../visitor/ReverseGradientVisitor";
import Parameter from "../structure/node/Parameter";
import Learn4js from "../Learn4js";
import Tensor from "../core/Tensor";
import ExpressionFactory from "../structure/factory/ExpressionFactory";

export default class GradientDescentOptimizer {

  constructor({graph, learnRate = 0.001}) {
    this._graph = graph;
    this._learnRate = learnRate;
  }

  get graph() {
    return this._graph;
  }

  get learnRate() {
    return this._learnRate;
  }

  minimize(loss) {
    let learnRate = Learn4js.constant({name: 'learn_rate', data: Tensor.scalar(this._learnRate)});

    let depVisitor = new DependencyVisitor();
    loss.accept(depVisitor);

    let gradVisitor = new ReverseGradientVisitor(loss);
    loss.accept(gradVisitor);

    let assignList = [];

    for (let node of Object.values(depVisitor.dependencies)) {
      if (node instanceof Parameter) {
        let grad = gradVisitor.graph.getGradient(node);
        let mul = ExpressionFactory.createMultiply({left: learnRate, right: grad});
        let sub = ExpressionFactory.createSubtract({left: node, right: mul});
        let assign = ExpressionFactory.createAssign({target: node, value: sub});
        assignList.push(assign);
      }
    }

    return ExpressionFactory.createGroup({name: "TrainStep", list: assignList});
  }
}