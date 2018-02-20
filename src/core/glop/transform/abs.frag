precision mediump float;

varying vec2      outTex;
uniform sampler2D X;
uniform int       N;

void main(void) {
    float row = outTex.y;
    float col = outTex.x;
    vec4 x = texture2D(X, vec2(col, row));
    vec4 z = abs(x);
    gl_FragColor = z;
}
