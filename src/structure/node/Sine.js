import UnaryExpression from "./UnaryExpression";

export default class Sine extends UnaryExpression {

  constructor(base, {name} = {}) {
    super(base, {name});
  }

  get type() {
    return 'Sine';
  }

  accept(visitor, params) {
    visitor.visitSine(this, params);
  }

}