import ReductionOp from "./ReductionOp";

export default class ReduceMaxOp extends ReductionOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'reduceMax';
  }

  body(a, b) {
    return a;
  }

  getResult(accum, n) {
    return accum;
  }

  update(accum, a) {
    return Math.max(accum, a);
  }

}