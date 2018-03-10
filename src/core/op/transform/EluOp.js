import TransformOp from "./TransformOp";

export default class Elu extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'elu';
  }

  body(a, b) {
    return a > 0 ? a : Math.expm1(a);
  }

}