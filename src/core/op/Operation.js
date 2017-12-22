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
 */
export default class Operation {

  constructor(input, other, result) {
    this._input = input;
    this._other = other;
    this._result = result;
  }

  get input() {
    return this._input;
  }

  get other() {
    return this._other;
  }

  get result() {
    return this._result;
  }

  exec() {
    throw new Error('should not call base class\'s exec');
  }

}