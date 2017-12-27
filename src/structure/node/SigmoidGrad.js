import UnaryExpression from "./UnaryExpression";

export default class SigmoidGrad extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSigmoidGrad(this, params);
  }

}