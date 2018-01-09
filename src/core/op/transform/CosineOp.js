import TransformOp from "./TransformOp";

export default class CosineOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'cos';
  }

  body(a, b) {
    return Math.cos(a);
  }

}