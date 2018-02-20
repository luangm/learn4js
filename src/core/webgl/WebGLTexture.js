const COMPONENT_PER_TEXEL = 4;

export default class WebGLTexture {

  constructor(data, shape, context, {isOutput} = {}) {
    this._context = context;
    this._shape = shape;
    if (isOutput) {
      this._texture = this._createUByteTexture();
    } else {
      this._texture = this._createFloatTexture(data);
    }
  }

  /**
   * @returns {WebGLContext}
   */
  get context() {
    return this._context;
  }

  get height() {
    return this._shape[0];
  }

  get texture() {
    return this._texture;
  }

  get width() {
    return this._shape[1];
  }

  /**
   * Create a texture using the supplied data and shape.
   * If the shape's side is not Power of 4, the texture is padded with 0s
   */
  _createFloatTexture(data) {
    let gl = this.context.context;

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // No Need to pad
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width / COMPONENT_PER_TEXEL, this.height, 0, gl.RGBA, gl.FLOAT, data || null);

    // TODO: PAdding

    // clamp to edge to support non-power of two textures
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // don't interpolate when getting data from texture
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    // we're done with setup, so unbind current texture
    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;
  }

  /**
   * Create a (padded) texture suitable for reading into an array with readPixels.
   * UNSIGNED_BYTE
   */
  _createUByteTexture() {
    let gl = this.context.context;

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // No Need to pad
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

    // TODO: PAdding

    // clamp to edge to support non-power of two textures
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // don't interpolate when getting data from texture
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    // we're done with setup, so unbind current texture
    gl.bindTexture(gl.TEXTURE_2D, null);

    return texture;
  }
}
