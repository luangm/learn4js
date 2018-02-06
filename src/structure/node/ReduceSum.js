import ReductionExpression from "./ReductionExpression";
import ShapeUtils from "../../core/util/ShapeUtils";

export default class ReduceSum extends ReductionExpression {

  constructor(base, reduceDim = -1, {name, scope} = {}) {
    super(base, reduceDim, {name, scope});
    this._shape = ShapeUtils.reduce(base.shape, reduceDim);
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