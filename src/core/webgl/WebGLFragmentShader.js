import WebGLShader from "./WebGLShader";

export default class WebGLFragmentShader extends WebGLShader {

  /**
   * @param source
   * @param context {WebGLContext}
   */
  constructor(source, context) {
    super(context.context.FRAGMENT_SHADER, source, context);
  }

}