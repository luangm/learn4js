import Expression from "../../Expression";
import ShapeUtils from "../../../core/util/ShapeUtils";

/**
 * Base class of all Reduction operations.
 * The shape of the result depends on the inputs and reduction dimension
 * If reduceDim == -1, then it's reduce all dimensions.
 */
export default class ReductionExpression extends Expression {

  constructor(base, dimension = -1, {name, graph, scope} = {}) {
    super({name, graph, scope});
    this._base = base;
    this._dimension = dimension;
    this._shape = ShapeUtils.reduce(base.shape, dimension);
  }

  get base() {
    return this._base;
  }

  /**
   * The dimension to be reduced on.
   * If == -1, then reduce all dimensions
   */
  get dimension() {
    return this._dimension;
  }

  get params() {
    return {
      name: this._name,
      base: this.base.id,
      dim: this.dimension
    }
  }

  get shape() {
    return this._shape;
  }

}