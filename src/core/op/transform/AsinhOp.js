import TransformOp from "./TransformOp";

export default class AsinhOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'asinh';
  }

  body(a, b) {
    return Math.asinh(a);
  }

}