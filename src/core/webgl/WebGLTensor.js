import WebGLTexture from "./WebGLTexture";

export default class WebGLTensor {

  /**
   * @param data Float32Array
   * @param shape [M, N]
   * @param context WebGLContext
   */
  constructor(data, shape, context) {
    this._context = context;
    this._shape = shape;
    this._texture = new WebGLTexture(data, shape, context);
  }

  /**
   * WebGLContext
   * @returns {WebGLContext}
   */
  get context() {
    return this._context;
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
    let gl = this.context.context;

    let M = this.shape[0];
    let N = this.shape[1];
    let out = this.context.createOutputTexture(M, N);
    console.log(this);
    this.context.encode(this, out);

    let result = new Float32Array(this.context.readData(M, N));

    return result;
  }

  _createOutputTexture() {

  }
}