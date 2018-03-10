import Tensor from "./core/Tensor";
import Learn4js from "./Learn4js";
import Session from "./session/Session";
import Expression from "./structure/Expression";
import Graph from "./structure/Graph";
import Logger from "./util/Logger";

export {
  Graph,
  Tensor,
  Session,
  Logger
}

export function abs(base, {name} = {}) {
  return Learn4js.factory.abs(base, {name});
}

export function add(left, right, {name} = {}) {
  return Learn4js.factory.add(left, right, {name});
}

export function constant(value, {name} = {}) {
  return Learn4js.factory.constant(value, {name});
}

export function divide(left, right, {name} = {}) {
  return Learn4js.factory.divide(left, right, {name});
}

export function cos(base, {name} = {}) {
  return Learn4js.factory.cos(base, {name});
}

export function exp(base, {name} = {}) {
  return Learn4js.factory.exp(base, {name});
}

export function expm1(base, {name} = {}) {
  return Learn4js.factory.expm1(base, {name});
}

export function fill(scalar, shape, {name} = {}) {
  return Learn4js.factory.fill(scalar, shape, {name});
}

export function log(base, {name} = {}) {
  return Learn4js.factory.log(base, {name});
}

export function matmul(left, right, transposeLeft, transposeRight, {name} = {}) {
  return Learn4js.factory.matmul(left, right, transposeLeft, transposeRight, {name});
}

export function max(left, right, {name} = {}) {
  return Learn4js.factory.max(left, right, {name});
}

export function min(left, right, {name} = {}) {
  return Learn4js.factory.min(left, right, {name});
}

export function multiply(left, right, {name} = {}) {
  return Learn4js.factory.multiply(left, right, {name});
}

export function negate(base, {name} = {}) {
  return Learn4js.factory.negate(base, {name});
}

export function parameter(value, {name} = {}) {
  return Learn4js.factory.parameter(value, {name});
}

export function reciprocal(base, {name} = {}) {
  return Learn4js.factory.reciprocal(base, {name});
}

export function reduceSum(base, dimension = -1, {name} = {}) {
  return Learn4js.factory.reduceSum(base, dimension, {name});
}

export function round(base, {name} = {}) {
  return Learn4js.factory.round(base, {name});
}

export function rsqrt(base, {name} = {}) {
  return Learn4js.factory.rsqrt(base, {name});
}

export function sigmoid(base, {name} = {}) {
  return Learn4js.factory.sigmoid(base, {name});
}

export function sign(base, {name} = {}) {
  return Learn4js.factory.sign(base, {name});
}

export function sin(base, {name} = {}) {
  return Learn4js.factory.sin(base, {name});
}

export function softmax(base, {name} = {}) {
  return Learn4js.factory.softmax(base, {name});
}

export function sqrt(base, {name} = {}) {
  return Learn4js.factory.sqrt(base, {name});
}

export function square(base, {name} = {}) {
  return Learn4js.factory.square(base, {name});
}

export function subtract(left, right, {name} = {}) {
  return Learn4js.factory.subtract(left, right, {name});
}

export function tan(base, {name} = {}) {
  return Learn4js.factory.tan(base, {name});
}

export function tanh(base, {name} = {}) {
  return Learn4js.factory.tanh(base, {name});
}

export function variable(shape, {name} = {}) {
  return Learn4js.factory.variable(shape, {name});
}

export function assign(target, value, {name} = {}) {
  return Learn4js.factory.assign(target, value, {name});
}

export function conv2d(image, kernel, {name} = {}) {
  return Learn4js.factory.conv2d(image, kernel, {name});
}

export function println(...array) {
  let result = [];
  for (let obj of array) {
    if (obj instanceof Tensor || obj instanceof Expression) {
      result.push(obj.toString());
    } else {
      result.push(obj);
    }
  }
  console.log(...result);
}