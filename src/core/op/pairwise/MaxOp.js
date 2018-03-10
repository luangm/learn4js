import PairwiseOp from "./PairwiseOp";

export default class MaxOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'max';
  }

  body(a, b) {
    return a > b ? a : b;
  }
}