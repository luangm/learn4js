import Graph from "./structure/Graph";
import Tensor from "./core/Tensor";
import Session from "./session/Session";
import Logger from "./util/Logger";
import Learn4js from "./Learn4js";
import Expression from "./structure/Expression";

export {
  Graph,
  Tensor,
  Session,
  Logger
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