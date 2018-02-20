import ENCODE_STRING from '../glsl/encode.glsl';
import VERTEX_SHADER_STRING from '../glsl/vertexShader.vert';
import WebGLProgram from "../WebGLProgram";

export default class Encode extends WebGLProgram {

  constructor(context) {
    super(VERTEX_SHADER_STRING, ENCODE_STRING, context);
  }

}