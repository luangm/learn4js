import BinaryExpression from "./BinaryExpression";
import {ShapeUtils} from "tensor4js";

export default class Minimum extends BinaryExpression {

  constructor(left, right, {name, graph, scope} = {}) {
    super(left, right, {name, graph, scope});

    this._shape = ShapeUtils.broadcastShapes(left.shape, right.shape);
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Minimum';
  }

  accept(visitor, params) {
    visitor.visitMinimum(this, params);
  }
}