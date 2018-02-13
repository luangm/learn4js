import WebGLShader from "./WebGLShader";

export default class WebGLVertexShader extends WebGLShader {

  constructor(source, webgl) {
    super(webgl.context.VERTEX_SHADER, source, webgl);
  }

}