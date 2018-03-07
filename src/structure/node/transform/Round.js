import TransformExpression from "./TransformExpression";

export default class Round extends TransformExpression {

  constructor(base, {name, graph, scope} = {}) {
    super(base, {name, graph, scope});
  }

  get type() {
    return 'Round';
  }

  accept(visitor, params) {
    visitor.visitRound(this, params);
  }

}