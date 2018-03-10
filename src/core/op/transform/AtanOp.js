import TransformOp from "./TransformOp";

export default class AtanOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'atan';
  }

  body(a, b) {
    return Math.atan(a);
  }

}