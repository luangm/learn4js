import SAXPY_STRING from '../glsl/saxpy.glsl';
import VERTEX_SHADER_STRING from '../glsl/vertexShader.vert';
import WebGLProgram from "../WebGLProgram";

export default class Axpy extends WebGLProgram {

  constructor(webgl) {
    super(VERTEX_SHADER_STRING, SAXPY_STRING, webgl);
  }

  get N() {
    return this.uniforms['N'];
  }

  get X() {
    return this.uniforms['X'];
  }

  get Y() {
    return this.uniforms['Y'];
  }

  get a() {
    return this.uniforms['a'];
  }

  get pos() {
    return this.attributes['pos'];
  }

  get tex() {
    return this.attributes['tex'];
  }
}