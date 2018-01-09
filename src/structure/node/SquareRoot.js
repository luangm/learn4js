import UnaryExpression from "./UnaryExpression";

export default class SquareRoot extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSqrt(this, params);
  }

}