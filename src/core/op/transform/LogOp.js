import TransformOp from "./TransformOp";

export default class LogOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'log';
  }

  body(a, b) {
    return Math.log(a);
  }

}