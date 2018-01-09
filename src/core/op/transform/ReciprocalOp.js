import TransformOp from "./TransformOp";

export default class ReciprocalOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'reciprocal';
  }

  body(a, b) {
    return 1 / a;
  }

}