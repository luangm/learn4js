import Expression from "../Expression";

export default class MeanSquaredError extends Expression {

  constructor(label, prediction, {name} = {}) {
    super(label, prediction, {name});
  }

  get type() {
    return 'MeanSquaredError';
  }

  accept(visitor, params) {
    visitor.visitMeanSquaredError(this, params);
  }

}