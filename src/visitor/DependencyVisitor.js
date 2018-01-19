import Visitor from "./Visitor";
import Logger from "../util/Logger";

export default class DependencyVisitor extends Visitor {

  constructor() {
    super();
    this._dependencies = {};
  }

  get dependencies() {
    return this._dependencies;
  }

  get logger() {
    if (!this._logger) {
      this._logger = new Logger('DependencyVisitor');
    }
    return this._logger;
  }

  preVisit(node, params) {
    this.dependencies[node.id] = node;
  }
}