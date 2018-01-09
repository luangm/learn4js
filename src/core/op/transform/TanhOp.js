import TransformOp from "./TransformOp";

export default class TanhOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'tanh';
  }

  body(a, b) {
    return Math.tanh(a);
  }

}