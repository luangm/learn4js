import TransformOp from "./TransformOp";

export default class CoshOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'cosh';
  }

  body(a, b) {
    return Math.cosh(a);
  }

}