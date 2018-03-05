import PairwiseOp from "./PairwiseOp";
import ShapeUtils from "../../util/ShapeUtils";

export default class AddOp extends PairwiseOp {

  constructor(input, other, result, params = {}) {
    super(input, other, result, params);
  }

  get isSpecial() {
    return true;
  }

  get type() {
    return 'add';
  }

  body(a, b) {
    return a + b;
  }

  exec() {
    let input = this.input.data;
    let other = this.other.data;
    let result = this.result.data;

    let inputStrides = this.input.strides;
    let otherStrides = this.other.strides;
    let resultStrides = this.result.strides;

    let inputBroadDims = ShapeUtils.getBroadcastedDimensions(this.input.shape, this.result.shape);
    let otherBroadDims = ShapeUtils.getBroadcastedDimensions(this.other.shape, this.result.shape);

    let inputPointer = 0;
    let otherPointer = 0;
    let resultPointer = 0;

    let shape = this.result.shape;
    let rank = shape.length;
    let slots = new Array(rank).fill(0);

    while (true) {

      // Calc
      result[resultPointer] = input[inputPointer] + other[otherPointer];

      let r = rank - 1;
      for (; r >= 0; r--) {
        slots[r]++;

        if (!inputBroadDims[r]) {
          inputPointer += inputStrides[r];
        }

        if (!otherBroadDims[r]) {
          otherPointer += otherStrides[r];
        }

        resultPointer += resultStrides[r];

        if (slots[r] < shape[r]) {
          break;
        }

        slots[r] = 0;

        if (!inputBroadDims[r]) {
          inputPointer -= inputStrides[r] * shape[r];
        }

        if (!otherBroadDims[r]) {
          otherPointer -= otherStrides[r] * shape[r];
        }

        resultPointer -= resultStrides[r] * shape[r];
      }

      // Overflown
      if (r < 0) {
        break;
      }
    }

  }

  exec2() {
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
          result[resultOffset] = input[inputOffset] + other[otherOffset];
        }
      }
    }
  }

}