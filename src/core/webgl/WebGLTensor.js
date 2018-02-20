import WebGLTexture from "./WebGLTexture";

export default class WebGLTensor {

  /**
   * @param data Float32Array
   * @param shape [M, N]
   * @param context WebGLContext
   * @param isOutput if the tensor should be an output tensor, for encoding
   */
  constructor(data, shape, context, {isOutput} = {}) {
    this._context = context;
    this._shape = shape;
    this._isOutput = isOutput || false;
    this._texture = new WebGLTexture(data, shape, context, {isOutput});
  }

  /**
   * WebGLContext
   * @returns {WebGLContext}
   */
  get context() {
    return this._context;
  }

  /**
   * Checks if the tensor is an output to CPU tensor
   */
  get isOutput() {
    return this._isOutput;
  }

  /**
   * Shape of the Tensor
   */
  get shape() {
    return this._shape;
  }

  /**
   * WebGLTexture
   * @returns {WebGLTexture}
   */
  get texture() {
    return this._texture;
  }

  transfer() {
    return this.context.encode(this);
  }
}