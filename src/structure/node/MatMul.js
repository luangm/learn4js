import BinaryExpression from "./BinaryExpression";

export default class MatMul extends BinaryExpression {

  constructor(left, right, {name, transposeLeft, transposeRight} = {}) {
    super(left, right, {name});
    this._transposeLeft = transposeLeft || false;
    this._transposeRight = transposeRight || false;

    // TODO: Multi-Dimension Support
    this._shape = [0, 0];
    this._shape[0] = transposeLeft ? left.shape[1] : left.shape[0];
    this._shape[1] = transposeRight ? right.shape[0] : right.shape[1];
  }

  get params() {
    return {
      name: this._name,
      left: this.left.id,
      right: this.right.id,
      transposeLeft: this.transposeLeft,
      transposeRight: this.transposeRight
    }
  }

  get shape() {
    return this._shape;
  }

  get transposeLeft() {
    return this._transposeLeft;
  }

  get transposeRight() {
    return this._transposeRight;
  }

  get type() {
    return 'MatMul';
  }

  accept(visitor, params) {
    visitor.visitMatMul(this, params);
  }

}