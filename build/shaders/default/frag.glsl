precision mediump float;
#define GLSLIFY 1

uniform sampler2D u_Sampler;
varying vec4 v_Color;
varying vec2 v_Texcoord;

void main() {
  gl_FragColor = v_Color * texture2D(u_Sampler, v_Texcoord);
}