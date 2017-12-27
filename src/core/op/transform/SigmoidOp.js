import TransformOp from "./TransformOp";

/**
 * Performs Sigmoid on each item
 */
export default class SigmoidOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sigmoid';
  }

  body(a, b) {
    return 1 / (1 + Math.exp(-a));
  }

}