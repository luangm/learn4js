import TransformOp from "./TransformOp";

export default class RandomOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'rand';
  }

  body(a, b) {
    return Math.random();
  }

}