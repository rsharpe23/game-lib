uniform sampler2D u_Sampler;

varying mediump vec3 v_Color;
varying mediump vec2 v_Texcoord;

void main(void) {
  gl_FragColor = vec4(v_Color, 1.0) * texture2D(u_Sampler, v_Texcoord);
}