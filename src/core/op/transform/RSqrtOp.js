import TransformOp from "./TransformOp";

export default class RSqrtOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'rsqrt';
  }

  body(a, b) {
    return 1 / Math.sqrt(a);
  }

}