import TransformOp from "./TransformOp";

export default class LinspaceOp extends TransformOp {

  constructor(input, other, result, {from = 0, to = 0, num = 1} = {}) {
    super(input, other, result, {from, to, num});

    this._from = from;
    this._step = num === 1 ? 0 : (to - from) / (num - 1);
  }

  get type() {
    return 'linspace';
  }

  body(a, b, offset) {
    return offset * this._step + this._from;
  }

}