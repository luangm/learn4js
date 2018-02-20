precision mediump float;

varying vec2      outTex;
uniform sampler2D X;
uniform sampler2D Y;
uniform int       N;

void main(void) {
    float row = outTex.y;
    float col = outTex.x;
    vec4 x = texture2D(X, vec2(col, row));
    vec4 y = texture2D(Y, vec2(col, row));
    vec4 z = x + y;
    gl_FragColor = z;
}
