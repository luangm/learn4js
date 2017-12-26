import ReductionExpression from "./ReductionExpression";

export default class ReduceSum extends ReductionExpression {

  constructor({name, base, reduceDim = 0}) {
    super({name, base, reduceDim});
  }

  accept(visitor, params) {
    visitor.visitReduceSum(this, params);
  }

}