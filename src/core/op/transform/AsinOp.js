import TransformOp from "./TransformOp";

export default class AsinOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'asin';
  }

  body(a, b) {
    return Math.asin(a);
  }

}