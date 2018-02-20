import ENCODE_STRING from '../glsl/encode.glsl';
import WebGLProgram from "../WebGLProgram";

export default class Encode extends WebGLProgram {

  constructor(context) {
    super(ENCODE_STRING, context);
  }

  get type() {
    return 'encode';
  }
}