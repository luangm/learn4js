import TransformOp from "./TransformOp";

export default class SoftmaxOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get isSpecial() {
    return true;
  }

  get type() {
    return 'softmax';
  }

  body(a, b) {
    throw new Error('Softmax should not call body');
  }

  exec(dim) {

    let input = this.input.data;
    let result = this.result.data;

    let inputStride = this.input.strides;
    let resultStride = this.result.strides;

    let shape = this.result.shape;

    if (shape.length === 2) {
      for (let i = 0; i < shape[0]; i++) {

        let max = 0;
        let sum = 0;
        for (let j = 0; j < shape[1]; j++) {
          let inputOffset = i * inputStride[0] + j * inputStride[1];
          let a = input[inputOffset];
          if (a > max) {
            max = a;
          }
        }

        for (let j = 0; j < shape[1]; j++) {
          let inputOffset = i * inputStride[0] + j * inputStride[1];
          let a = Math.exp(input[inputOffset] - max);
          input[inputOffset] = a;
          sum += a;
        }

        for (let j = 0; j < shape[1]; j++) {
          let inputOffset = i * inputStride[0] + j * inputStride[1];
          let resultOffset = i * resultStride[0] + j * resultStride[1];

          result[resultOffset] = input[inputOffset] / sum;
        }
      }
    }

  }

}