export default class WebGLShader {

  /**
   * @param type
   * @param source
   * @param context {WebGLContext}
   */
  constructor(type, source, context) {
    this._type = type;
    this._context = context;
    this._shader = this._createShader(type, source);
  }

  /**
   * @returns {WebGLContext}
   */
  get context() {
    return this._context;
  }

  get shader() {
    return this._shader;
  }

  get type() {
    return this._type;
  }

  /**
   * @private
   */
  _createShader(type, source) {
    let gl = this.context.context;
    let shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error('Could not compile shader: ' + gl.getShaderInfoLog(shader));
    }

    return shader;
  }

}