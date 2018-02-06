import MatMul from "../node/MatMul";
import Negate from "../node/Negate";
import Multiply from "../node/Multiply";
import SigmoidGrad from "../node/SigmoidGrad";
import ReduceSum from "../node/ReduceSum";
import Subtract from "../node/Subtract";
import Assign from "../node/Assign";
import Group from "../node/Group";
import Step from "../node/Step";
import Cosine from "../node/Cosine";
import Sine from "../node/Sine";
import TangentGrad from "../node/TangentGrad";
import SquareRootGrad from "../node/SquareRootGrad";
import Sign from "../node/Sign";
import Reciprocal from "../node/Reciprocal";
import Im2Col from "../node/Im2Col";
import Conv2dImageGrad from "../node/Conv2dImageGrad";
import Conv2dKernelGrad from "../node/Conv2dKernelGrad";
import MaxPoolGrad from "../node/MaxPoolGrad";
import SoftmaxGrad from "../node/SoftmaxGrad";

export default class ExpressionFactory {

  constructor(graph) {
    this._graph = graph;
  }

  get graph() {
    return this._graph;
  }

  static createAssign({name, target, value}) {
    return new Assign({name, target, value});
  }

  static createConv2dImageGrad({name, image, kernel, grad}) {
    return new Conv2dImageGrad({name, image, kernel, grad});
  }

  static createConv2dKernelGrad({name, image, kernel, grad}) {
    return new Conv2dKernelGrad({name, image, kernel, grad});
  }

  static createCosine({name, base}) {
    return new Cosine(base, {name});
  }

  static createGroup(list, {name} = {}) {
    return new Group(list, {name});
  }

  static createIm2Col({name, image, kernel}) {
    return new Im2Col({name, image, kernel});
  }

  static createMatMul({name, left, right, transposeLeft, transposeRight}) {
    return new MatMul(left, right, {name, transposeLeft, transposeRight});
  }

  static createMaxPoolGrad({name, image, kernelShape, grad, strideWidth, strideHeight}) {
    return new MaxPoolGrad({name, image, kernelShape, grad, strideWidth, strideHeight});
  }

  static createMultiply({name, left, right}) {
    return new Multiply(left, right, {name});
  }

  static createNegate({name, base}) {
    return new Negate(base, {name});
  }

  static createReciprocal({name, base}) {
    return new Reciprocal({name, base});
  }

  static createReduceSum({name, base, reduceDim}) {
    if (reduceDim >= 0) {
      return new ReduceSum({name, base, reduceDim});
    }
    return base;
  }

  static createSigmoidGrad({name, base}) {
    return new SigmoidGrad(base, {name});
  }

  static createSign({name, base}) {
    return new Sign(base, {name});
  }

  static createSine({name, base}) {
    return new Sine(base, {name});
  }

  static createSoftmaxGrad({name, base, grad}) {
    return new SoftmaxGrad({name, base, grad});
  }

  static createSqrtGrad({name, base}) {
    return new SquareRootGrad(base, {name});
  }

  static createStep({name, base}) {
    return new Step(base, {name});
  }

  static createSubtract({name, left, right}) {
    return new Subtract(left, right, {name});
  }

  static createTanGrad({name, base}) {
    return new TangentGrad(base, {name});
  }
}