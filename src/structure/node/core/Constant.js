import Expression from "../../Expression";
import Tensor from "../../../core/Tensor";

export default class Constant extends Expression {

  constructor(value, {name, scope} = {}) {
    super({name, scope});
    this._value = Tensor.create(value);
  }

  get params() {
    return {
      name: this._name,
      id: this.id
    }
  }

  get shape() {
    return this.value.shape;
  }

  get type() {
    return 'Constant';
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
  }

  accept(visitor, params) {
    visitor.visitConstant(this, params);
  }
}