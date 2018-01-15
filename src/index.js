import ComputeGraph from "./structure/ComputeGraph";
import Expression from "./structure/Expression";
import Tensor from "./core/Tensor";
import Shape from "./core/Shape";
import Session from "./session/Session";
import Learn4js from "./Learn4js";

export {
  ComputeGraph,
  Expression,
  Tensor,
  Shape,
  Session
}

export default Learn4js;

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