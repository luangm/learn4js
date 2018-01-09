import TransformOp from "./TransformOp";

export default class TanOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'tan';
  }

  body(a, b) {
    return Math.tan(a);
  }

}