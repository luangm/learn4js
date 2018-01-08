import TransformOp from "./TransformOp";

export default class StepOp extends TransformOp {

  constructor(input, other, result) {
    super(input, other, result);
  }

  get type() {
    return 'step';
  }

  body(a, b) {
    return a > 0 ? 1 : 0;
  }

}