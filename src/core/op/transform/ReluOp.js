import TransformOp from "./TransformOp";

export default class ReluOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'relu';
  }

  body(a, b) {
    return a > 0 ? a : 0;
  }

}