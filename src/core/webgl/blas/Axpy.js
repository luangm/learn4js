import SAXPY_STRING from '../glsl/saxpy_1.glsl';
import WebGLProgram from "../WebGLProgram";

export default class Axpy extends WebGLProgram {

  constructor(context) {
    super(SAXPY_STRING, context);
  }

  get type() {
    return 'axpy';
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