import WebGLAttribute from "./WebGLAttribute";
import WebGLFragmentShader from "./WebGLFragmentShader";
import WebGLUniform from "./WebGLUniform";
import WebGLVertexShader from "./WebGLVertexShader";

const POS_ATTRIBUTE_NAME = 'pos';
const TEX_ATTRIBUTE_NAME = 'tex';

/**
 * A WebGLProgram caches the actual WebGLProgram object (same name),
 * it's attribute and uniform locations and types
 */
export default class WebGLProgram {

  /**
   * @param vertexShaderString
   * @param fragmentShaderString
   * @param context {WebGLContext}
   */
  constructor(vertexShaderString, fragmentShaderString, context) {
    let gl = context.context;
    let vertexShader = new WebGLVertexShader(vertexShaderString, context);
    let fragShader = new WebGLFragmentShader(fragmentShaderString, context);

    this._context = context;
    this._program = this._createProgram(vertexShader, fragShader);
    context.program = this;
    this._attributes = this._cacheAttributes();
    this._uniforms = this._cacheUniforms();
    this._bindVertices();
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
   * @returns {WebGLTensor}
   */
  get Y() {
    return this.context.input1;
  }

  /**
   * @param tensor {WebGLTensor}
   */
  set Y(tensor) {
    this.activate();
    this.context.input1 = tensor;
    this.uniforms['Y'].value = 1;
  }

  /**
   * The result tensor
   * @returns {WebGLTensor}
   */
  get Z() {
    return this.context.output;
  }

  /**
   * Sets the result tensor
   * @param tensor {WebGLTensor}
   */
  set Z(tensor) {
    this.activate();
    this.context.output = tensor;
    this.N = tensor.shape[1];
  }

  get attributes() {
    return this._attributes;
  }

  /**
   * WebGLContext
   * @returns {WebGLContext}
   */
  get context() {
    return this._context;
  }

  get isActive() {
    return this.context.program === this;
  }

  get program() {
    return this._program;
  }

  get uniforms() {
    return this._uniforms;
  }

  activate() {
    if (!this.isActive) {
      this.context.program = this;
    }
  }

  /**
   * Executes this program
   */
  exec() {
    this.activate();
    let gl = this.context.context;
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  /**
   * Binds Vertices to vertex shader
   * @private
   */
  _bindVertices() {
    let gl = this.context.context;

    // bind vertices
    let position = this.attributes[POS_ATTRIBUTE_NAME].location;
    gl.enableVertexAttribArray(position);

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // define a square that covers the screen
    var vertices = [-1.0, -1.0, 0.0,	// bottom left
      1.0, -1.0, 0.0,	// bottom right
      1.0, 1.0, 0.0,	// top right
      -1.0, 1.0, 0.0];	// top left
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(position, /*item size*/3, gl.FLOAT, false, 0, 0);


    // bind texture cords
    var texture = this.attributes[TEX_ATTRIBUTE_NAME].location;
    var texCoords = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoords);
    var textureCoords = [0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    gl.vertexAttribPointer(texture, /*item size*/2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texture);

    // index to vertices
    var indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    // tesselate square into triangles
    // indeces into vertex array creating triangles, with counter-clockwise winding
    var vertexIndices = [0, 1, 2,	// bottom right triangle
      0, 2, 3];	// top left triangle
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
  }

  _cacheAttributes() {
    let gl = this.context.context;

    let attributes = {};
    let n = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);

    for (let i = 0; i < n; i++) {
      let info = gl.getActiveAttrib(this._program, i);
      attributes[info.name] = new WebGLAttribute(this._program, info.name, info.type, gl);
    }

    return attributes;
  }

  _cacheUniforms() {
    let gl = this.context.context;

    let uniforms = {};
    let n = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);

    for (let i = 0; i < n; i++) {
      let info = gl.getActiveUniform(this._program, i);
      uniforms[info.name] = new WebGLUniform(this._program, info.name, info.type, gl);
    }

    return uniforms;
  }

  _createProgram(vertexShader, fragmentShader) {
    let gl = this.context.context;

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