import ReductionExpression from "./ReductionExpression";

export default class ReduceSum extends ReductionExpression {

  constructor(base, dimension = -1, {name, scope} = {}) {
    super(base, dimension, {name, scope});
  }

  get type() {
    return 'ReduceSum';
  }


  accept(visitor, params) {
    visitor.visitReduceSum(this, params);
  }

}