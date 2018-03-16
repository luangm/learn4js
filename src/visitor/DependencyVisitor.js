import Visitor from "./Visitor";

export default class DependencyVisitor extends Visitor {

  constructor() {
    super();
    this._dependencies = {};
  }

  get dependencies() {
    return this._dependencies;
  }

  preVisit(node, params) {
    this.dependencies[node.id] = node;
  }
}