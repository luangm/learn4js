import PairwiseOp from "./PairwiseOp";

export default class AddOp extends PairwiseOp {

  constructor(input, other, result, params = {}) {
    super(input, other, result, params);
  }

  get type() {
    return 'add';
  }

  body(a, b) {
    return a + b;
  }
}