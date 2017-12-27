import BinaryExpression from "./BinaryExpression";
import TensorUtils from "../../core/util/TensorUtils";

export default class Divide extends BinaryExpression {

  constructor({name, left, right}) {
    super({name, left, right});

    this._shape = TensorUtils.broadcastShapes(left.shape, right.shape);
  }

  get shape() {
    return this._shape;
  }

  accept(visitor, params) {
    visitor.visitDivide(this, params);
  }
}