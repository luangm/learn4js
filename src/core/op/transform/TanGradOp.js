import TransformOp from "./TransformOp";

export default class TanGradOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'tanGrad';
  }

  body(a, b) {
    let sec = 1 / Math.cos(a);
    return sec * sec;
  }

}