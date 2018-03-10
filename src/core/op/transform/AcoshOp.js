import TransformOp from "./TransformOp";

export default class AcoshOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'acosh';
  }

  body(a, b) {
    return Math.acosh(a);
  }

}