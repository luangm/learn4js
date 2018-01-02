import TransformOp from "./TransformOp";

export default class SetOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'set';
  }

  body(a, b) {
    return b;
  }

}