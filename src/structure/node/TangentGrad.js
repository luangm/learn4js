import UnaryExpression from "./UnaryExpression";

export default class TangentGrad extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitTangentGrad(this, params);
  }

}