import Expression from "../../Expression";

/**
 * A Variable is holder of externally changed data (such as input and label).
 * The variable's value is expected to change on each iteration.
 *
 * This is contrast to Parameter where the changes are driven internally.
 *
 * equivalent to TensorFlow's Placeholder and Pytorch's Variable(nonDifferentiable)
 */
export default class Variable extends Expression {

  constructor(shape, {name, graph, scope} = {}) {
    super({name, graph, scope});
    this._shape = shape;
  }

  get shape() {
    return this._shape;
  }

  get type() {
    return 'Variable';
  }

  accept(visitor, params) {
    visitor.visitVariable(this, params);
  }
}