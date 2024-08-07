#define GLSLIFY 1
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

// Модель отражения Блинна-Фонга (с затенением Гуро, 
// если применять в вершинном шейдере)

// Параметр inout - это что-то вроде необязательного (для установки) out-параметра.
// Если вместо этого указать просто out, то результат будет некорректным, 
// т.к. out-параметр, похоже, нужно устанавливать обязательно.
void calcReflection(vec4 pos, vec4 normal, vec3 lightingPos, 
  out float lambertTerm, inout float specularValue) {

  vec3 eye = normalize(-pos.xyz);
  vec3 normal3 = normalize(normal.xyz);
  vec3 dirToLight = normalize(lightingPos);

  lambertTerm = max(dot(normal3, -dirToLight), 0.0);
  if (lambertTerm > 0.0) {
    vec3 halfDir = normalize(-dirToLight + eye);
    float angle = max(dot(halfDir, normal3), 0.0);
    specularValue = pow(angle, 16.0);
  }
}

// TODO: Попробовать скомбинировать цвета в одну структуру
vec4 calcLighting(vec4 pos, vec4 normal, vec3 lightingPos, 
  vec4 ambientColor, vec4 diffuseColor, vec4 specularColor) {

  float lambertTerm;
  float specularValue;
  calcReflection(pos, normal, lightingPos, lambertTerm, specularValue);

  return ambientColor + diffuseColor * lambertTerm 
    + specularColor * specularValue;
}

void main() {
  v_Texcoord = a_Texcoord;

  vec4 pos = u_MVMatrix * a_Position;

  v_Color = calcLighting(pos, u_NMatrix * a_Normal, u_LightingPos, 
    u_AmbientColor * u_MaterialAmbientColor, u_DiffuseColor, 
    u_SpecularColor * u_MaterialAmbientColor);

  gl_Position = u_PMatrix * pos;
}