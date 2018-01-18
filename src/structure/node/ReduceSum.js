import ReductionExpression from "./ReductionExpression";

export default class ReduceSum extends ReductionExpression {

  constructor(base, {name, scope, reduceDim = -1} = {}) {
    super(base, {name, scope, reduceDim});
    this._shape = [1, 1];
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'ReduceSum';
  }


  accept(visitor, params) {
    visitor.visitReduceSum(this, params);
  }

}