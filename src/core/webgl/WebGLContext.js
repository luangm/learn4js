/**
 * Wrapper around WebGL Context
 *
 */
import Encode from "./blas/Encode";

export default class WebGLContext {

  static COMPONENT_PER_TEXEL = 4;

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
    // this._program = new WebGLProgram(VERTEX_SHADER_STRING, SAXPY_STRING, gl);

    // console.log(this._program);
  }

  get canvas() {
    return this._canvas;
  }

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

  get texture0() {
    return this._texture0;
  }

  set texture0(texture) {
    this._texture0 = texture;

    let gl = this.context;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
  }

  get texture1() {
    return this._texture1;
  }

  set texture1(texture) {
    this._texture1 = texture;

    let gl = this.context;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
  }

  get texture2() {
    return this._texture2;
  }

  set texture2(texture) {
    this._texture2 = texture;

    let gl = this.context;
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, texture.texture);
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

  bindVertices() {
    let gl = this.context;
    let program = this._program;

    // define a square that covers the screen
    let vertices = [
      -1.0, -1.0, 0.0,  // bottom left
      1.0, -1.0, 0.0,   // bottom right
      1.0, 1.0, 0.0,    // top right
      -1.0, 1.0, 0.0    // top left
    ];
    let position = this.setAttributeValue(program, 'pos', vertices, 3);

    // texture coords
    let textureCoords = [
      0.0, 0.0,
      1.0, 0.0,
      1.0, 1.0,
      0.0, 1.0
    ];
    let texture = this.setAttributeValue(program, 'tex', textureCoords, 2);

    let indices = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);

    // tesselate square into triangles
    // indeces into vertex array creating triangles, with counter-clockwise winding
    var vertexIndices = [
      0, 1, 2,  // bottom right triangle
      0, 2, 3   // top left triangle
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
  }

  bindVertices2(program) {
    var gl = this.context,
      renderer = program;

    // bind vertices
    var position = gl.getAttribLocation(renderer, 'pos');
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // define a square that covers the screen
    var vertices = [-1.0, -1.0, 0.0,	// bottom left
      1.0, -1.0, 0.0,	// bottom right
      1.0, 1.0, 0.0,	// top right
      -1.0, 1.0, 0.0];	// top left
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.vertexAttribPointer(position, /*item size*/3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(position);

    // bind texture cords
    var texture = gl.getAttribLocation(renderer, 'tex');
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
  };

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
    this.useProgram(this._encode);
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

  render() {
    let gl = this.context;
    let program = this._program;

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  setAttributeValue(program, name, value, componentSize) {
    let gl = this.context;

    let location = gl.getAttribLocation(program, name);

    let buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value), gl.STATIC_DRAW);
    gl.vertexAttribPointer(location, componentSize, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(location);

    return location;
  }

  setUniformFloatValue(program, name, value, context) {
    let gl = context || this.context;

    let location = gl.getUniformLocation(program, name);
    gl.uniform1f(location, value);
  }

  setUniformIntValue(program, name, value, context) {
    let gl = context || this.context;

    let location = gl.getUniformLocation(program, name);
    gl.uniform1i(location, value);
  }

  /**
   * Activate a program
   * @param program
   */
  useProgram(program) {
    this.context.useProgram(program.program);
    this.bindVertices2(program.program);
  }
}