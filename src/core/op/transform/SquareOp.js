import TransformOp from "./TransformOp";

/**
 * Performs Square on each item
 */
export default class SquareOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  body(a, b) {
    return a * a;
  }

}