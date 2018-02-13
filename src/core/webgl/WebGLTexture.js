const COMPONENT_PER_TEXEL = 4;

export default class WebGLTexture {

  constructor(data, shape, webgl) {
    this._context = webgl.context;
    this._shape = shape;
    this._texture = this._createTexture(data);
  }

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

  _createTexture(data) {
    let gl = this.context;

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // No Need to pad
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width / COMPONENT_PER_TEXEL, this.height, 0, gl.RGBA, gl.FLOAT, data);

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
