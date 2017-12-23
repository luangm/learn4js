import UnaryExpression from "./UnaryExpression";

export default class Square extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitSquare(this, params);
  }

}