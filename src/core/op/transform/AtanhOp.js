import TransformOp from "./TransformOp";

export default class AtanhOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'atanh';
  }

  body(a, b) {
    return Math.atanh(a);
  }

}