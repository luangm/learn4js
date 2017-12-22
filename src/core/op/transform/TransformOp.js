import Operation from "../Operation";

/**
 * Base class for all Transform (unary) ops.
 * Such as abs, sigmoid, relu etc.
 *
 * TransformOps
 */
export default class TransformOp extends Operation {

  constructor(input, other, result) {
    super(input, other, result);
  }
}