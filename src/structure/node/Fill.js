import Expression from "../Expression";

/**
 * A fill expression takes a scalar and a shape, fill it to make a tensor.
 * Does NOT store the tensor itself. The tensor is built at runtime.
 */
export default class Fill extends Expression {

  constructor({name, scalar, shape}) {
    super(name);

    this._scalar = scalar;
    this._shape = shape;
  }

  get scalar() {
    return this._scalar;
  }

  get shape() {
    return this._shape;
  }

  accept(visitor, params) {
    visitor.visitFill(this, params);
  }

}