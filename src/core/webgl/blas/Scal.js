import SCAL_STRING from '../glsl/scal_1.glsl';
import WebGLProgram from "../WebGLProgram";

export default class Scal extends WebGLProgram {

  constructor(context) {
    super(SCAL_STRING, context);
  }

  get type() {
    return 'scal';
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