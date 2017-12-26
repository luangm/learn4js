import TransformOp from "./TransformOp";

/**
 * Performs Negate on each item
 */
export default class NegateOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'negate';
  }

  body(a, b) {
    return -a;
  }

}