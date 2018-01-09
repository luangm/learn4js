import TransformOp from "./TransformOp";

export default class SineOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sign';
  }

  body(a, b) {
    return Math.sign(a);
  }

}