import Expression from "../Expression";

/**
 * A fill expression takes a scalar and a shape, fill it to make a tensor.
 * Does NOT store the tensor itself. The tensor is built at runtime.
 */
export default class Fill extends Expression {

  constructor(scalar, shape, {name, scope} = {}) {
    super({name, scope});

    this._scalar = scalar;
    this._shape = shape;
  }

  get params() {
    return {
      name: this._name,
      scalar: this.scalar,
      shape: this.shape
    }
  }

  get scalar() {
    return this._scalar;
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Fill';
  }

  accept(visitor, params) {
    visitor.visitFill(this, params);
  }

}