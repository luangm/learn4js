import BinaryExpression from "./BinaryExpression";
import {ShapeUtils} from "tensor4js";

export default class Multiply extends BinaryExpression {

  constructor(left, right, {name, graph, scope} = {}) {
    super(left, right, {name, graph, scope});
    this._shape = ShapeUtils.broadcastShapes(left.shape, right.shape);
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