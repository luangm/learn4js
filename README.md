# learn4js
The GPU-accelerated, Imperative Machine Learning Framework for Javascript.
For other languages, see [Learn4j](Java)(Java) [Learn4i](iOS)(iOS) and [Learn4N](.NET)(.NET)

## Quickstart

installation using npm

```commandline
npm install learn4js
```

### Usage Pattern

```javascript
import Learn4js, {println, Tensor} from 'learn4js';

let W = Learn4js.parameter([[1, 2, 3], [4, 5, 6]]); // create a 2x3 matrix as a parameter
let x = Learn4js.variable([3, 1]); // Create a Variable with shape of 3x2
let b = Learn4js.parameter(Tensor.rand([2, 1])); // bias term 2x1 with initial value of rand
let y = Learn4js.variable([2, 1]); // The real label 


let z = Learn4js.add(Learn4js.matmul(W, x), b); // z = W @ x + b
let yHat = Learn4js.sigmoid(z);
let loss = Learn4js.sumSquaredError(y, yHat);

```

## Completed Ops

| Op            | Eval  | Grad  |
| ---           | :---: | :---: |
| Abs           | Y     | Y     |
| Add           | Y     | Y     |
| Assign        | Y     |       |
| Cos           | Y     | Y     |
| Divide        | Y     |       |
| Exp           | Y     | Y     |
| Fill          | Y     |       |
| Group         | Y     |       |
| Log           | Y     | Y     |
| MatMul        | Y     | Y     |
| Mult          | Y     | Y     |
| Negate        | Y     | Y     |
| ReduceSum     | Y     |       |
| Relu          | Y     | Y     |
| Sigmoid       | Y     | Y     |
| SigmoidGrad   | Y     |       |
| Sign          | Y     |       |
| Sine          | Y     | Y     |
| Square        | Y     | Y     |
| SquareRoot    | Y     |       |
| Step          | Y     |       |
| Subtract      | Y     | Y     |
| Tangent       | Y     | Y     |
| TangentGrad   | Y     |       |
| Tanh          | Y     |       |
| Conv2d        | Y     | Y     |
| MaxPool       | Y     | Y     |
| Receprocal    | Y     |       |
| Softmax       | Y     | Y     |
| LogSumExp     | Y     |       |


