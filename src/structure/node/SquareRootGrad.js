import UnaryExpression from "./UnaryExpression";

export default class SquareRootGrad extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSqrtGrad(this, params);
  }

}