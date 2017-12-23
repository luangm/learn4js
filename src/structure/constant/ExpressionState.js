class ExpressionState {
  constructor() {
    return {
      DETACHED: 0, // not tracked by Graph
      ATTACHED: 1, // added to graph
      // Modified?
      // Deleted?
    }
  }
}

export default Object.freeze(new ExpressionState());