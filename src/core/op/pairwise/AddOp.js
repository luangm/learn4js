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

  exec() {
    let input = this.input.data;
    let other = this.other.data;
    let result = this.result.data;

    for (let i = 0; i < input.length; i++) {
      result[i] = input[i] + other[i];
    }
  }
}