import UnaryExpression from "./UnaryExpression";

export default class TangentGrad extends UnaryExpression {

  constructor(base, {name}) {
    super(base, {name});
  }

  get type() {
    return 'TangentGrad';
  }

  accept(visitor, params) {
    visitor.visitTangentGrad(this, params);
  }

}