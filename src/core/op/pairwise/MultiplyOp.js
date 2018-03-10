import PairwiseOp from "./PairwiseOp";

export default class MultiplyOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'multiply';
  }

  body(a, b) {
    return a * b;
  }

}