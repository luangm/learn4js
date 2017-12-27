import MatMul from "../node/MatMul";
import Negate from "../node/Negate";
import Multiply from "../node/Multiply";

export default class ExpressionFactory {

  static createMatMul({name, left, right, transposeLeft, transposeRight}) {
    return new MatMul({name, left, right, transposeLeft, transposeRight});
  }

  static createNegate({name, base}) {
    return new Negate({name, base});
  }

  static createMultiply({name, left, right}) {
    return new Multiply({name, left, right});
  }
}