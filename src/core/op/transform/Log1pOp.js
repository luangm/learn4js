import TransformOp from "./TransformOp";

export default class Log1pOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'log1p';
  }

  body(a, b) {
    return Math.log1p(a);
  }

}