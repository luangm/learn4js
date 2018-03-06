import Tensor from "../../../core/Tensor";
import Expression from "../../Expression";

/**
 * A parameter expression is one that need to be modified in order to minimize a loss
 * A parameter takes in a tensor value.
 */
export default class Parameter extends Expression {

  /**
   * Value can be a tensor or an array
   */
  constructor(value, {name, graph, scope} = {}) {
    super({name, graph, scope});
    this._value = Tensor.create(value);
  }

  get params() {
    return !this._name ? null : {
      name: this._name
    };
  }

  get shape() {
    return this.value.shape;
  }

  get type() {
    return 'Parameter';
  }

  get value() {
    return this._value;
  }

  set value(val) {
    super.value = val;
    this._value = val;
  }

  accept(visitor, params) {
    visitor.visitParameter(this, params);
  }
}