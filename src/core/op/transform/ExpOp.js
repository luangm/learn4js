import TransformOp from "./TransformOp";

export default class ExpOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'exp';
  }

  body(a, b) {
    return Math.exp(a);
  }

}