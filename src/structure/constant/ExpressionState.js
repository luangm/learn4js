class ExpressionState {
  constructor() {
    return {
      DETACHED: 0, // not tracked by Graph
      ATTACHED: 1, // added to graph
      MODIFIED: 2, // Expression's value is modified or if one of it's precedents value is modified
      EVALUATED: 3
    }
  }
}

export default Object.freeze(new ExpressionState());