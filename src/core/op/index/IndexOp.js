import Operation from "../Operation";

export default class IndexOp extends Operation {

  update(accum, a, accumIndex, idx) {
    throw new Error('IndexOp.update should not be called');
  }
}