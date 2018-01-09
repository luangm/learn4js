import TransformOp from "./TransformOp";

export default class SqrtGradOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sqrtGrad';
  }

  body(a, b) {
    return 1 / 2 / Math.sqrt(a);
  }

}