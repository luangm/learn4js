import MatMul from "../node/MatMul";

class ExpressionFactory {

  createMatMul({name, left, right, transposeLeft, transposeRight}) {
    return new MatMul({name, left, right, transposeLeft, transposeRight});
  }
}

export default new ExpressionFactory();