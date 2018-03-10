import TransformOp from "./TransformOp";

export default class AcosOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'acos';
  }

  body(a, b) {
    return Math.acos(a);
  }

}