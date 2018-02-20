import WebGLProgram from "../../webgl/WebGLProgram";
import SHADER_STRING from './exp.frag';

export default class ExpProgram extends WebGLProgram {

  constructor(context) {
    super(SHADER_STRING, context);
  }

  get type() {
    return 'exp';
  }
}