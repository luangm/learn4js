import Expression from "../Expression";
import Tensor from "../../core/Tensor";

export default class Constant extends Expression {

  constructor({name, data, shape}) {
    super(name);

    this._value = new Tensor(data, shape);
  }

  get value() {
    return this._value;
  }

  accept(visitor, params) {
    visitor.visitConstant(this, params);
  }
}