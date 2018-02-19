/**
 * Wrapper around WebGL Context
 *
 */
import Encode from "./blas/Encode";

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

  bindOutputTexture(M, N, texture) {
    let gl = this.context;

    this.canvas.height = M;
    this.canvas.width = N;
    gl.viewport(0, 0, N, M);

    if (!this.framebuffer) {
      this.framebuffer = this.framebuffer || gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
    }
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, /*level*/0);

    // if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
    //   throw new Error("Bound framebuffer is not complete.");
    // }

    return this.framebuffer;
  }


  /**
   * Create a (padded) texture suitable for reading into an array with readPixels.
   * UNSIGNED_BYTE
   * can be passed to bindDestinationTexture.
   *
   * @param height
   * @param width
   * @param context
   * @returns {*}
   */
  createOutputTexture(height, width, context) {
    let gl = context || this.context;

    // var pad = this.getPad(w);

    // create and bind texture to render to
    var destTexture = gl.createTexture();
    //gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, destTexture);
    gl.texImage2D(gl.TEXTURE_2D, /*level*/0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // clamp to edge to support non-power of two textures
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // don't interpolate when getting data from texture
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    // we're done with setup, so unbind current texture
    gl.bindTexture(gl.TEXTURE_2D, null);

    return destTexture;
  };

  /**
   * Executes a program to encode a tensor to output texture
   * @param tensor
   * @param out
   */
  encode(tensor, out) {
    let gl = this.context;
    let M = tensor.shape[0];
    let N = tensor.shape[1];
    this.program = this._encode;
    this.input0 = tensor;
    this._encode.X.value = 0;
    this._encode.N.value = N;

    this.bindOutputTexture(M, N, out);

    gl.drawElements(gl.TRIANGLES, /*num items*/6, gl.UNSIGNED_SHORT, 0);

    // this.unbindInputTexture(gl.TEXTURE0);
  }

  /* Read data out as unsigned bytes */
  readData(M, N, context) {
    let gl = context || this.context;

    // create destination buffer
    let rawbuffer = new ArrayBuffer(M * N * Float32Array.BYTES_PER_ELEMENT);

    // read the result into our buffer, as bytes
    let prod = new Uint8Array(rawbuffer);
    gl.readPixels(0, 0, N, M, gl.RGBA, gl.UNSIGNED_BYTE, prod);

    // return raw result bytes
    return rawbuffer; // M x N
  };

}