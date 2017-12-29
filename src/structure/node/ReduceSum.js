import ReductionExpression from "./ReductionExpression";

export default class ReduceSum extends ReductionExpression {

  constructor({name, base, reduceDim = -1}) {
    super({name, base, reduceDim});
    this._shape = [1, 1];
  }

  get shape() {
    return this._shape;
  }

  accept(visitor, params) {
    visitor.visitReduceSum(this, params);
  }

}