export default class WebGLTensor {

  constructor(data, shape, context) {
    this._context = context;
    this._texture = context.createDataTexture(data, shape);
  }

  get context() {
    return this._context;
  }

  get texture() {
    return this._texture;
  }
}