import TransformOp from "./TransformOp";

export default class SigmoidGradOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sigmoidGrad';
  }

  body(a, b) {
    let sigmoid = 1 / (1 + Math.exp(-a));
    return sigmoid * (1.0 - sigmoid);
  }

}