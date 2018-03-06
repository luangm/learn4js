import Assign from "../node/Assign";
import Add from "../node/binary/Add";
import Divide from "../node/binary/Divide";
import MatMul from "../node/binary/MatMul";
import Multiply from "../node/binary/Multiply";
import Subtract from "../node/binary/Subtract";
import Conv2d from "../node/cnn/Conv2d";
import Conv2dImageGrad from "../node/cnn/Conv2dImageGrad";
import Constant from "../node/core/Constant";
import Parameter from "../node/core/Parameter";
import Variable from "../node/core/Variable";
import Fill from "../node/Fill";
import Group from "../node/Group";
import ReduceSum from "../node/reduction/ReduceSum";
import Tile from "../node/Tile";
import Absolute from "../node/transform/Absolute";
import Cosine from "../node/transform/Cosine";
import Exponential from "../node/transform/Exponential";
import Logarithm from "../node/transform/Logarithm";
import Negate from "../node/transform/Negate";
import Reciprocal from "../node/transform/Reciprocal";
import Sigmoid from "../node/transform/Sigmoid";
import SigmoidGrad from "../node/transform/SigmoidGrad";
import Sign from "../node/transform/Sign";
import Sine from "../node/transform/Sine";
import Softmax from "../node/transform/Softmax";
import SoftmaxGrad from "../node/transform/SoftmaxGrad";
import Square from "../node/transform/Square";
import SquareRoot from "../node/transform/SquareRoot";
import SquareRootGrad from "../node/transform/SquareRootGrad";
import Step from "../node/transform/Step";
import Tangent from "../node/transform/Tangent";
import TangentGrad from "../node/transform/TangentGrad";

/**
 * Expression Factory create nodes and add it to the Graph.
 */
export default class ExpressionFactory {

  constructor(graph) {
    this._graph = graph;
  }

  get graph() {
    return this._graph;
  }

  static createConv2dKernelGrad({name, image, kernel, grad}) {
    return new Conv2dKernelGrad({name, image, kernel, grad});
  }

  static createIm2Col({name, image, kernel}) {
    return new Im2Col({name, image, kernel});
  }

  static createMaxPoolGrad({name, image, kernelShape, grad, strideWidth, strideHeight}) {
    return new MaxPoolGrad({name, image, kernelShape, grad, strideWidth, strideHeight});
  }

  abs(base, {name} = {}) {
    let result = this.graph.add(new Absolute(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  add(left, right, {name} = {}) {
    let result = this.graph.add(new Add(left, right, {name, graph: this.graph}));
    left.addObserver(result);
    right.addObserver(result);
    return result;
  }

  assign(target, newValue, {name} = {}) {
    let result = this.graph.add(new Assign(target, newValue, {name, graph: this.graph}));
    newValue.addObserver(result);
    return result;
  }

  constant(value, {name} = {}) {
    return this.graph.add(new Constant(value, {name, graph: this.graph}));
  }

  conv2d(image, kernel, {name} = {}) {
    let result = this.graph.add(new Conv2d(image, kernel, {name, graph: this.graph}));
    image.addObserver(result);
    kernel.addObserver(result);
    return result;
  }

  conv2dImageGrad(image, kernel, grad, {name} = {}) {
    let result = this.graph.add(new Conv2dImageGrad(image, kernel, grad, {name, graph: this.graph}));
    return result;
  }

  cos(base, {name} = {}) {
    let result = this.graph.add(new Cosine(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  divide(left, right, {name} = {}) {
    let result = this.graph.add(new Divide(left, right, {name, graph: this.graph}));
    left.addObserver(result);
    right.addObserver(result);
    return result;
  }

  exp(base, {name} = {}) {
    let result = this.graph.add(new Exponential(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  fill(scalar, shape, {name} = {}) {
    return this.graph.add(new Fill(scalar, shape, {name, graph: this.graph}));
  }

  group(list, {name} = {}) {
    let result = this.graph.add(new Group(list, {name, graph: this.graph}));
    for (let item of list) {
      item.addObserver(result);
    }
    return result;
  }

  log(base, {name} = {}) {
    let result = this.graph.add(new Logarithm(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  matmul(left, right, transposeLeft, transposeRight, {name} = {}) {
    let result = this.graph.add(new MatMul(left, right, transposeLeft, transposeRight, {name, graph: this.graph}));
    left.addObserver(result);
    right.addObserver(result);
    return result;
  }

  multiply(left, right, {name} = {}) {
    let result = this.graph.add(new Multiply(left, right, {name, graph: this.graph}));
    left.addObserver(result);
    right.addObserver(result);
    return result;
  }

  // maxPool({name, image, kernelShape, strideWidth, strideHeight}) {
  //   let node = new MaxPool({name, image, kernelShape, strideWidth, strideHeight});
  //   this.activeGraph.add(node);
  //   return node;
  // }

  negate(base, {name} = {}) {
    let result = this.graph.add(new Negate(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  parameter(value, {name} = {}) {
    return this.graph.add(new Parameter(value, {name, graph: this.graph}));
  }

  reciprocal(base, {name} = {}) {
    let result = this.graph.add(new Reciprocal(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  reduceSum(base, dimension, {name} = {}) {
    if (dimension != null) {
      let result = this.graph.add(new ReduceSum(base, dimension, {name, graph: this.graph}));
      base.addObserver(result);
      return result;
    }
    return base;
  }

  sigmoid(base, {name} = {}) {
    let result = this.graph.add(new Sigmoid(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  sigmoidGrad(base, {name} = {}) {
    let result = this.graph.add(new SigmoidGrad(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  sign(base, {name} = {}) {
    let result = this.graph.add(new Sign(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  sin(base, {name} = {}) {
    let result = this.graph.add(new Sine(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  softmax(base, {name} = {}) {
    let result = this.graph.add(new Softmax(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  softmaxGrad(base, grad, {name} = {}) {
    let result = this.graph.add(new SoftmaxGrad(base, grad, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  sqrt(base, {name} = {}) {
    let result = this.graph.add(new SquareRoot(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  sqrtGrad(base, {name} = {}) {
    let result = this.graph.add(new SquareRootGrad(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  square(base, {name} = {}) {
    let result = this.graph.add(new Square(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  step(base, {name} = {}) {
    let result = this.graph.add(new Step(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  subtract(left, right, {name} = {}) {
    let result = this.graph.add(new Subtract(left, right, {name, graph: this.graph}));
    left.addObserver(result);
    right.addObserver(result);
    return result;
  }

  tan(base, {name} = {}) {
    let result = this.graph.add(new Tangent(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  tanGrad(base, {name} = {}) {
    let result = this.graph.add(new TangentGrad(base, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  tile(base, scale, {name} = {}) {
    let result = this.graph.add(new Tile(base, scale, {name, graph: this.graph}));
    base.addObserver(result);
    return result;
  }

  variable(shape, {name} = {}) {
    return this.graph.add(new Variable(shape, {name, graph: this.graph}));
  }
}