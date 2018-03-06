import BinaryExpression from "./BinaryExpression";
import TensorUtils from "../../../core/util/TensorUtils";

export default class Add extends BinaryExpression {

  constructor(left, right, {name, graph, scope} = {}) {
    super(left, right, {name, graph, scope});

    this._shape = TensorUtils.broadcastShapes(left.shape, right.shape);
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Add';
  }

  accept(visitor, params) {
    visitor.visitAdd(this, params);
  }
}