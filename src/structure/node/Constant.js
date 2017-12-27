import Expression from "../Expression";
import Tensor from "../../core/Tensor";

export default class Constant extends Expression {

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

  accept(visitor, params) {
    visitor.visitConstant(this, params);
  }
}

Constant.TWO = new Constant({name: 'TWO', data: [2], shape: [1,1]});