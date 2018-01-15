import LossExpression from "./LossExpression";

export default class SumSquaredError extends LossExpression {

  constructor(label, prediction, {name} = {}) {
    super(label, prediction, {name});
  }

  get type() {
    return 'SumSquaredError';
  }

  accept(visitor, params) {
    visitor.visitSumSquaredError(this, params);
  }

}