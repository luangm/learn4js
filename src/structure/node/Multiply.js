import BinaryExpression from "./BinaryExpression";
import TensorUtils from "../../core/util/TensorUtils";

export default class Multiply extends BinaryExpression {

  constructor(left, right, {name, scope} = {}) {
    super(left, right, {name, scope});
    this._shape = TensorUtils.broadcastShapes(left.shape, right.shape);
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Multiply';
  }

  accept(visitor, params) {
    visitor.visitMultiply(this, params);
  }
}