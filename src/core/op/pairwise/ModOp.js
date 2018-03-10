import PairwiseOp from "./PairwiseOp";

export default class ModOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'mod';
  }

  body(a, b) {
    return a % b;
  }
}