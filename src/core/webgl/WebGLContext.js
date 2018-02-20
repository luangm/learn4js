/**
 * Wrapper around WebGL Context
 *
 */
import Encode from "./blas/Encode";
import WebGLTensor from "./WebGLTensor";

export default class WebGLContext {

  constructor(options = {}) {
    this._canvas = options.canvas || document.createElement('canvas');
    this._context = options.context || this._canvas.getContext('webgl', {
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });

    let gl = this._context;
    if (gl == null) {
      throw new Error("WebGL not supported");
    }

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // float texture extension
    try {
      this._floatExt = gl.getExtension('OES_texture_float');
    } catch (e) {
      console.warn("No support for OES_texture_float extension!");
    }

    // highp
    this._highp = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);

    this._encode = new Encode(this);
  }

  get canvas() {
    return this._canvas;
  }

  /**
   * @returns {WebGLRenderingContext}
   */
  get context() {
    return this._context;
  }

  get hasFloat() {
    return this._floatExt != null;
  }

  /**
   * This is first input tensor
   */
  get input0() {
    return this._input0;
  }

  /**
   * Binds the first tensor
   * @param tensor
   */
  set input0(tensor) {
    this._input0 = tensor;
    let gl = this.context;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tensor.texture.texture);
  }

  get input1() {
    return this._input1;
  }

  set input1(tensor) {
    this._input1 = tensor;
    let gl = this.context;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, tensor.texture.texture);
  }

  get input2() {
    return this._input2;
  }

  set input2(tensor) {
    this._input2 = tensor;
    let gl = this.context;
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, tensor.texture.texture);
  }

  get output() {
    return this._output;
  }

  /**
   * Binds a Tensor to the output
   * @param tensor The output tensor
   */
  set output(tensor) {
    this._output = tensor;
    let gl = this.context;

    let M = tensor.shape[0];
    let N = tensor.shape[1];
    this.canvas.height = M;
    this.canvas.width = N;
    gl.viewport(0, 0, N, M);

    if (!this.framebuffer) {
      this.framebuffer = this.framebuffer || gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    }
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tensor.texture.texture, /*level*/0);
  }

  /**
   * Returns the currently activated program
   * @returns {WebGLProgram}
   */
  get program() {
    return this._program;
  }

  /**
   * Sets the active program
   * @param value {WebGLProgram}
   */
  set program(value) {
    this._program = value;
    this.context.useProgram(value.program);
  }

  /**
   * Executes a program to encode a tensor to output texture
   * @param tensor
   */
  encode(tensor) {
    let outTensor = new WebGLTensor(null, tensor.shape, this, {isOutput: true});
    let program = this._encode;
    this.program = program;
    program.X = tensor;
    program.Z = outTensor;
    program.exec();

    let M = tensor.shape[0];
    let N = tensor.shape[1];
    return this.readData(M, N);
  }

  /* Read data out as unsigned bytes */
  readData(M, N) {
    let gl = this.context;

    // create destination buffer
    let rawbuffer = new ArrayBuffer(M * N * Float32Array.BYTES_PER_ELEMENT);

    // read the result into our buffer, as bytes
    let prod = new Uint8Array(rawbuffer);
    gl.readPixels(0, 0, N, M, gl.RGBA, gl.UNSIGNED_BYTE, prod);

    // return raw result bytes
    return new Float32Array(rawbuffer); // M x N
  };

}