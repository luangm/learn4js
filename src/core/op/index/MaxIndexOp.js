import IndexOp from "./IndexOp";

export default class MaxIndexOp extends IndexOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'imax';
  }

  body(a, b) {
    return a;
  }

  getResult(accum, n) {
    return accum;
  }

  update(accum, a, accumIndex, idx) {
    return a > accum ? [a, idx] : [accum, accumIndex];
  }

}