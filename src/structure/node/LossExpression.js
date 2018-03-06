import Expression from "../Expression";

/**
 * Base class of all loss functions.
 */
export default class LossExpression extends Expression {

  constructor(label, prediction, {name, graph, scope} = {}) {
    super({name, graph, scope});

    this._label = label;
    this._prediction = prediction;
  }

  get label() {
    return this._label;
  }

  get prediction() {
    return this._prediction;
  }

  get shape() {
    return [];
  }

}