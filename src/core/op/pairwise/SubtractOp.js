import PairwiseOp from "./PairwiseOp";

export default class SubtractOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get isSpecial() {
    return true;
  }

  get type() {
    return 'subtract';
  }

  body(a, b) {
    return a - b;
  }

  exec() {
    let input = this.input.data;
    let other = this.other.data;
    let result = this.result.data;

    let inputStride = this.input.strides;
    let otherStride = this.other.strides;
    let resultStride = this.result.strides;

    let shape = this.result.shape;

    if (shape.length === 2) {
      for (let i = 0; i < shape[0]; i++) {
        for (let j = 0; j < shape[1]; j++) {
          let inputOffset = i * inputStride[0] + j * inputStride[1];
          let otherOffset = i * otherStride[0] + j * otherStride[1];
          let resultOffset = i * resultStride[0] + j * resultStride[1];
          result[resultOffset] = input[inputOffset] - other[otherOffset];
        }
      }
    }
  }
}