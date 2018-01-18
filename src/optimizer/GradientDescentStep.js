import OptimizationStep from "./OptimizationStep";

export default class GradientDescentStep extends OptimizationStep {

  constructor(target, grad, {name, learnRate = 0.001} = {}) {
    super(target, grad, {name});
    this._learnRate = learnRate;
  }

  get learnRate() {
    return this._learnRate;
  }

  set learnRate(val) {
    this._learnRate = val;
  }

  get type() {
    return 'GradientDescentStep';
  }

  get params() {
    return {
      name: this._name,
      target: this.target.id,
      grad: this.grad.id,
      learnRate: this.learnRate
    }
  }

  accept(visitor, params) {
    visitor.visitGradientDescentStep(this, params);
  }
}