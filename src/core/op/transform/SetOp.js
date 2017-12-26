import TransformOp from "./TransformOp";

/**
 *
 * TransformOps
 */
export default class SetOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'set';
  }

  body(a, b) {
    return b;
  }

}