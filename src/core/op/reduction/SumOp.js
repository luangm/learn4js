import ReductionOp from "./ReductionOp";

export default class SumOp extends ReductionOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sum';
  }

  body(a, b) {
    return a;
  }

  getResult(accum, n) {
    return accum;
  }

  update(accum, a) {
    return accum + a;
  }

}