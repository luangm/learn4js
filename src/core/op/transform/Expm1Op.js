import TransformOp from "./TransformOp";

export default class Expm1Op extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'expm1';
  }

  body(a, b) {
    return Math.expm1(a);
  }
}