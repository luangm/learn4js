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
    let ex = Math.exp(a);
    return ex / (ex + 1);
  }

}