import ENCODE_STRING from '../glsl/encode.glsl';
import VERTEX_SHADER_STRING from '../glsl/vertexShader.vert';
import WebGLProgram from "../WebGLProgram";

export default class Encode extends WebGLProgram {

  constructor(webgl) {
    super(VERTEX_SHADER_STRING, ENCODE_STRING, webgl);
  }

  get N() {
    return this.uniforms['N'];
  }

  get X() {
    return this.uniforms['X'];
  }

  get pos() {
    return this.attributes['pos'];
  }

  get tex() {
    return this.attributes['tex'];
  }
}