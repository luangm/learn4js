import Expression from "../Expression";

export default class SoftmaxCrossEntropy extends Expression {

  constructor(labels, logits, {name, scope} = {}) {
    super({name, scope});

    this._labels = labels;
    this._logits = logits;
  }

  get labels() {
    return this._labels;
  }

  get logits() {
    return this._logits;
  }

  get shape() {
    return this._logits.shape;
  }

  get type() {
    return 'SoftmaxCrossEntropy';
  }

  accept(visitor, params) {
    visitor.visitSoftmaxCrossEntropy(this, params);
  }

}