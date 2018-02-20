import WebGLProgram from "../../webgl/WebGLProgram";
import SHADER_STRING from './abs.frag';

export default class AbsProgram extends WebGLProgram {

  constructor(context) {
    super(SHADER_STRING, context);
  }

  get type() {
    return 'abs';
  }
}