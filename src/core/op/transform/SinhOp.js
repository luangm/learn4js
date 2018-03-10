import TransformOp from "./TransformOp";

export default class SinhOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sinh';
  }

  body(a, b) {
    return Math.sinh(a);
  }

}