import Expression from "../../Expression";
import TensorUtils from "../../../core/util/TensorUtils";

export default class Conv2d extends Expression {

  constructor(image, kernel, {name, graph, scope} = {}) {
    super({name, graph, scope});
    this._image = image;
    this._kernel = kernel;
    this._shape = TensorUtils.computeConv2dShape(image, kernel);
  }

  get image() {
    return this._image;
  }

  get kernel() {
    return this._kernel;
  }

  get shape() {
    return this._shape;
  }

  accept(visitor, params) {
    visitor.visitConv2d(this, params);
  }

}