#define GLSLIFY 1
attribute float a_Index;

uniform vec4 u_Positions[2];
uniform mat4 u_Matrix;

void main() {
  vec4 position = u_Positions[int(a_Index)];
  gl_Position = u_Matrix * position;
}