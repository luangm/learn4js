import Operation from "../Operation";
import TransformOp from "./TransformOp";

/**
 * Base class for all Transform (unary) ops.
 * Such as abs, sigmoid, relu etc.
 *
 * TransformOps
 */
export default class SetOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  body(a, b) {

  }

  exec() {

  }


}