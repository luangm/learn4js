import SCAL_STRING from '../glsl/scal_1.glsl';
import VERTEX_SHADER_STRING from '../glsl/vertexShader.vert';
import WebGLProgram from "../WebGLProgram";

export default class Scal extends WebGLProgram {

  constructor(webgl) {
    super(VERTEX_SHADER_STRING, SCAL_STRING, webgl);
  }

  get N() {
    return this._N;
  }

  set N(value) {
    this.activate();
    this._N = value;
    this.uniforms['N'].value = value;
  }

  /**
   * @returns {WebGLTensor}
   */
  get X() {
    return this.context.input0;
  }

  /**
   * @param tensor {WebGLTensor}
   */
  set X(tensor) {
    this.activate();
    this.context.input0 = tensor;
    this.uniforms['X'].value = 0;
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

  /**
   * @returns {Number}
   */
  get b() {
    return this._b;
  }

  /**
   * @param value {Number}
   */
  set b(value) {
    this.activate();
    this._b = value;
    this.uniforms['b'].value = value;
  }
}