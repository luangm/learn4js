/**
 * Wrapper around a webgl attribute variable.
 */
export default class WebGLAttribute {

  constructor(program, name, type, context) {
    this._program = program;
    this._name = name;
    this._context = context;
    this._type = type;
    this._location = context.getAttribLocation(program, name);
  }

  get context() {
    return this._context;
  }

  /**
   * A GLint number indicating the location of the variable name if found. Returns -1 otherwise.
   */
  get location() {
    return this._location;
  }

  get name() {
    return this._name;
  }

  get program() {
    return this._program;
  }

  get type() {
    return this._type;
  }

  set value(value) {
    let gl = this.context;

    switch (this.type) {
      case gl.FLOAT:
        this.setValue1f(value);
        break;
      case gl.INT:
        this.setValue1i(value);
        break;
      case gl.SAMPLER_2D:
        this.setValue1i(value);
        break;
    }
  }

  setValue1f(value) {
    // this.context.uniform1f(this.location, value);
  }

  setValue1i(value) {
    // this.context.uniform1i(this.location, value);
  }

}