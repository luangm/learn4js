import BinaryExpression from "./BinaryExpression";
import TensorUtils from "../../../core/util/TensorUtils";

export default class Maximum extends BinaryExpression {

  constructor(left, right, {name, graph, scope} = {}) {
    super(left, right, {name, graph, scope});

    this._shape = TensorUtils.broadcastShapes(left.shape, right.shape);
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Maximum';
  }

  accept(visitor, params) {
    visitor.visitMaximum(this, params);
  }
}