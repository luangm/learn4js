import Expression from "../Expression";
import Tensor from "../../core/Tensor";

export default class Variable extends Expression {

  constructor({name, data, shape}) {
    super(name);

    this._value = new Tensor({data, shape});
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
    visitor.visitVariable(this, params);
  }
}