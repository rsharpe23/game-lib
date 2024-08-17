attribute vec4 a_Position;
attribute vec4 a_Normal;
attribute vec2 a_Texcoord;

uniform mat4 u_PMatrix;
uniform mat4 u_MVMatrix;
uniform mat4 u_NMatrix;

uniform vec4 u_AmbientColor;
uniform vec4 u_DiffuseColor;
uniform vec4 u_SpecularColor;
uniform vec3 u_LightingPos;

uniform vec4 u_MaterialAmbientColor;
uniform vec4 u_MaterialSpecularColor;

varying vec4 v_Color;
varying vec2 v_Texcoord;

#pragma glslify: calcLighting = require(./lighting.glsl)

void main() {
  v_Texcoord = a_Texcoord;

  vec4 pos = u_MVMatrix * a_Position;

  // TODO: Все умножение вынести в отдельные переменные, так сократится 
  // длина и будет более понятно, что передается в аргументы
  v_Color = calcLighting(pos, u_NMatrix * a_Normal, u_LightingPos, 
    u_AmbientColor * u_MaterialAmbientColor, u_DiffuseColor, 
    u_SpecularColor * u_MaterialAmbientColor);

  gl_Position = u_PMatrix * pos;
}