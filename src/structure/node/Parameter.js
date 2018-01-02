import Expression from "../Expression";
import Tensor from "../../core/Tensor";

export default class Parameter extends Expression {

  constructor({name, data, shape}) {
    super(name);

    if (data instanceof Tensor) {
      this._value = data;
    } else {
      this._value = new Tensor({data, shape});
    }
  }

  get shape() {
    return this.value.shape;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  accept(visitor, params) {
    visitor.visitParameter(this, params);
  }
}