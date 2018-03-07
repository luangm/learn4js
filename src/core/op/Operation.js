/**
 * This is the base interface class for Ops.
 *
 * Operations are distinct from Expression:
 * - Operations are computations
 * - Expressions are structure
 *
 * Each Operation takes three inputs in constructor:
 * - input
 * - other (if pairwise)
 * - result
 * - params: used for some ops for additional info
 */
export default class Operation {

  constructor(input, other, result, params = {}) {
    this._input = input;
    this._other = other;
    this._result = result;
    this._params = params;
  }

  get input() {
    return this._input;
  }

  get other() {
    return this._other;
  }

  get params() {
    return this._params;
  }

  get result() {
    return this._result;
  }

  get isSpecial() {
    return false;
  }

  get type() {
    throw new Error('should not call base class\'s type');
  }

  exec() {
    throw new Error('should not call base class\'s exec');
  }

  body(a, b) {

  }

  update(accum, a) {

  }

}