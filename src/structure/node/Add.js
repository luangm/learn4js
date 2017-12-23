import BinaryExpression from "./BinaryExpression";

export default class Add extends BinaryExpression {

  constructor({name, left, right}) {
    super({name, left, right});
  }

  accept(visitor, params) {
    visitor.visitAdd(this, params);
  }

}