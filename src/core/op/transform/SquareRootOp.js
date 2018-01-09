import TransformOp from "./TransformOp";

export default class SquareRootOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'sqrt';
  }

  body(a, b) {
    return Math.sqrt(a);
  }

}