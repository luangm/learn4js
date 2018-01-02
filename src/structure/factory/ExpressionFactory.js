import MatMul from "../node/MatMul";
import Negate from "../node/Negate";
import Multiply from "../node/Multiply";
import SigmoidGrad from "../node/SigmoidGrad";
import ReduceSum from "../node/ReduceSum";
import Subtract from "../node/Subtract";
import Assign from "../node/Assign";
import Group from "../node/Group";

export default class ExpressionFactory {

  static createMatMul({name, left, right, transposeLeft, transposeRight}) {
    return new MatMul({name, left, right, transposeLeft, transposeRight});
  }

  static createMultiply({name, left, right}) {
    return new Multiply({name, left, right});
  }

  static createNegate({name, base}) {
    return new Negate({name, base});
  }

  static createReduceSum({name, base, reduceDim}) {
    if (reduceDim >= 0) {
      return new ReduceSum({name, base, reduceDim});
    }
    return base;
  }

  static createSigmoidGrad({name, base}) {
    return new SigmoidGrad({name, base});
  }

  static createSubtract({name, left, right}) {
    return new Subtract({name, left, right});
  }

  static createAssign({name, target, value}) {
    return new Assign({name, target, value});
  }

  static createGroup({name, list}) {
    return new Group({name, list});
  }
}