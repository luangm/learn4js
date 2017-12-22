import Operation from "../Operation";

/**
 * A class of Special operations that are not suitable for element-wise operation
 */
export default class SpecialOp extends Operation {

  constructor(input, other, result) {
    super(input, other, result);
  }

}