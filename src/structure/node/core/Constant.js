import {Tensor} from "tensor4js";
import Expression from "../../Expression";

export default class Constant extends Expression {

  constructor(value, {name, graph, scope} = {}) {
    super({name, graph, scope});
    this._value = Tensor.create(value);
  }

  get params() {
    return {
      name: this._name,
      id: this.id
    }
  }

  get shape() {
    return this._value.shape;
  }

  get type() {
    return 'Constant';
  }

  get value() {
    return this._value;
  }

  set value(value) {
    throw new Error('Cannot set constant');
  }

  accept(visitor, params) {
    visitor.visitConstant(this, params);
  }
}