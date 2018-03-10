import TransformOp from "./TransformOp";

export default class SinOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sin';
  }

  body(a, b) {
    return Math.sin(a);
  }

}