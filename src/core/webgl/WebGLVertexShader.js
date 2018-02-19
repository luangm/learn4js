import WebGLShader from "./WebGLShader";

export default class WebGLVertexShader extends WebGLShader {

  /**
   * @param source
   * @param context {WebGLContext}
   */
  constructor(source, context) {
    super(context.context.VERTEX_SHADER, source, context);
  }

}