import TransformOp from "./TransformOp";

export default class RoundOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'round';
  }

  body(a, b) {
    return Math.round(a);
  }

}