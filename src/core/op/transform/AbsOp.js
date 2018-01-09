import TransformOp from "./TransformOp";

export default class AbsOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'abs';
  }

  body(a, b) {
    return Math.abs(a);
  }

}