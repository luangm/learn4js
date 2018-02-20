import WebGLProgram from "../../webgl/WebGLProgram";
import SHADER_STRING from './add.frag';

export default class AddProgram extends WebGLProgram {

  constructor(context) {
    super(SHADER_STRING, context);
  }

  get type() {
    return 'add';
  }
}