export default class WebGLShader {

  constructor(type, source, webgl) {
    this._type = type;
    this._context = webgl.context;
    let gl = this._context;
    this._shader = gl.createShader(type);
    gl.shaderSource(this._shader, source);
    gl.compileShader(this._shader);

    if (!gl.getShaderParameter(this._shader, gl.COMPILE_STATUS)) {
      throw new Error('Could not compile shader: ' + gl.getShaderInfoLog(this._shader));
    }
  }

  get context() {
    return this._context;
  }

  get shader() {
    return this._shader;
  }

  get type() {
    return this._type;
  }

}