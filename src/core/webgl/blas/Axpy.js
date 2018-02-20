import SAXPY_STRING from '../glsl/saxpy_1.glsl';
import VERTEX_SHADER_STRING from '../glsl/vertexShader.vert';
import WebGLProgram from "../WebGLProgram";

export default class Axpy extends WebGLProgram {

  constructor(context) {
    super(VERTEX_SHADER_STRING, SAXPY_STRING, context);
  }

  /**
   * @returns {Number}
   */
  get a() {
    return this._a;
  }

  /**
   * @param value {Number}
   */
  set a(value) {
    this.activate();
    this._a = value;
    this.uniforms['a'].value = value;
  }

}