import PairwiseOp from "./PairwiseOp";

export default class SubtractOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'subtract';
  }

  body(a, b) {
    return a - b;
  }
}