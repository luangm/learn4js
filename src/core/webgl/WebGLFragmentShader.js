import WebGLShader from "./WebGLShader";

export default class WebGLFragmentShader extends WebGLShader {

  constructor(source, webgl) {
    super(webgl.context.FRAGMENT_SHADER, source, webgl);
  }

}