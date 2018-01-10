import TransformOp from "./TransformOp";

export default class IndexSetOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'iset';
  }

  body(a, b) {
    return b;
  }

}