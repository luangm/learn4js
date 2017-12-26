import PairwiseOp from "./PairwiseOp";

export default class AddOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'add';
  }

  body(a, b) {
    return a + b;
  }
}