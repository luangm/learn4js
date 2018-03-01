import PairwiseOp from "./PairwiseOp";

export default class AddOp extends PairwiseOp {

  constructor(input, other, result) {
    super(input, other, result);
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

    let shape = this.result.shape;
    let rank = shape.length;

    let slots = [];
    for (let i = 0; i < shape.length; i++) {
      slots.push(0);
    }

    let pointer = 0; // This points to the current index

    while(true) {

      console.log("***", slots, pointer);

      // TODO: Handle calcs

      // let i = slots[0];
      // let j = slots[1];
      //
      // let inputOffset = i * inputStride[0] + j * inputStride[1];
      // let otherOffset = i * otherStride[0] + j * otherStride[1];
      // let resultOffset = i * resultStride[0] + j * resultStride[1];
      // result[pointer] = input[pointer] + other[pointer];

      // -- iterator

      let index = rank - 1;
      while (index >= 0) {
        slots[index]++;
        pointer += inputStrides[index];

        if (slots[index] === shape[index]) {
          // Reached dimension for that slot
          slots[index] = 0;
          pointer -= inputStrides[index] * shape[index];
          index--;
        } else {
          break;
        }
      }

      // Overflown
      if (index < 0) {
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