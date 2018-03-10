import PairwiseOp from "./PairwiseOp";

export default class MinOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'min';
  }

  body(a, b) {
    return a > b ? b : a;
  }
}