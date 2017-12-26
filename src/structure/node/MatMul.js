import BinaryExpression from "./BinaryExpression";

export default class MatMul extends BinaryExpression {

  constructor({name, left, right, transposeLeft, transposeRight}) {
    super({name, left, right});
    this._transposeLeft = transposeLeft || false;
    this._transposeRight = transposeRight || false;

    this._shape = [0, 0];
    this._shape[0] = transposeLeft ? left.shape[1] : left.shape[0];
    this._shape[1] = transposeRight ? right.shape[0] : right.shape[1];
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

  accept(visitor, params) {
    visitor.visitMatMul(this, params);
  }

}