import UnaryExpression from "./UnaryExpression";

export default class ReduceSum extends UnaryExpression {

  constructor({name, base}) {
    super({name, base});
  }

  accept(visitor, params) {
    visitor.visitReduceSum(this, params);
  }

}