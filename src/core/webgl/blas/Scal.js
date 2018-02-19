import SCAL_STRING from '../glsl/scal_1.glsl';
import VERTEX_SHADER_STRING from '../glsl/vertexShader.vert';
import WebGLProgram from "../WebGLProgram";

export default class Scal extends WebGLProgram {

  constructor(webgl) {
    super(VERTEX_SHADER_STRING, SCAL_STRING, webgl);
  }

  get N() {
    return this.uniforms['N'];
  }

  get X() {
    return this.uniforms['X'];
  }

  get a() {
    return this.uniforms['a'];
  }

  get b() {
    return this.uniforms['a'];
  }

  get pos() {
    return this.attributes['pos'];
  }

  get tex() {
    return this.attributes['tex'];
  }
}