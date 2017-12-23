class ExpressionType {
  constructor() {
    return {
      UNKNOWN: 0,
      CONSTANT: 1,
      ADD: 2,
    }
  }
}

export default Object.freeze(new ExpressionType());