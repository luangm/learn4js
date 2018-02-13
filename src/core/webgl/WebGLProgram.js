import WebGLAttribute from "./WebGLAttribute";
import WebGLFragmentShader from "./WebGLFragmentShader";
import WebGLUniform from "./WebGLUniform";
import WebGLVertexShader from "./WebGLVertexShader";

/**
 * A WebGLProgram caches the actual WebGLProgram object (same name),
 * it's attribute and uniform locations and types
 */
export default class WebGLProgram {

  constructor(vertexShaderString, fragmentShaderString, webgl) {
    this._context = webgl.context;
    let vertexShader = new WebGLVertexShader(vertexShaderString, webgl);
    let fragShader = new WebGLFragmentShader(fragmentShaderString, webgl);
    this._program = this._createProgram(vertexShader, fragShader);
    this._context.useProgram(this._program);
    this._attributes = this._cacheAttributes();
    this._uniforms = this._cacheUniforms();
  }

  get attributes() {
    return this._attributes;
  }

  get context() {
    return this._context;
  }

  get program() {
    return this._program;
  }

  get uniforms() {
    return this._uniforms;
  }

  _cacheAttributes() {
    let gl = this.context;

    let attributes = {};
    let n = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < n; i++) {
      let info = gl.getActiveAttrib(this._program, i);
      attributes[info.name] = new WebGLAttribute(this._program, info.name, info.type, gl);
    }

    return attributes;
  }

  _cacheUniforms() {
    let gl = this.context;

    let uniforms = {};
    let n = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < n; i++) {
      let info = gl.getActiveUniform(this._program, i);
      uniforms[info.name] = new WebGLUniform(this._program, info.name, info.type, gl);
    }

    return uniforms;
  }

  _createProgram(vertexShader, fragmentShader) {
    let gl = this.context;

    let program = gl.createProgram();

    gl.attachShader(program, vertexShader.shader);
    gl.attachShader(program, fragmentShader.shader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error("Program filed to link:" + gl.getProgramInfoLog(program));
    }

    return program;
  }

}