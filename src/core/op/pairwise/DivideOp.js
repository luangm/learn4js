import PairwiseOp from "./PairwiseOp";

export default class DivideOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'divide';
  }

  body(a, b) {
    return a / b;
  }
}