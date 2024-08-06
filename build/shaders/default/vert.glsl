#define GLSLIFY 1
attribute vec4 a_Position;
attribute vec4 a_Normal;
attribute vec2 a_Texcoord;

uniform mat4 u_PMatrix;
uniform mat4 u_MVMatrix;
uniform mat4 u_NMatrix;

uniform vec3 u_AmbientColor;
uniform vec3 u_DiffuseColor;
uniform vec3 u_SpecularColor;
uniform vec3 u_LightingPos;

uniform vec3 u_MaterialAmbientColor;
uniform vec3 u_MaterialSpecularColor;

varying vec4 v_Color;
varying vec2 v_Texcoord;

// Модель отражения Блинна-Фонга (с затенением Гуро, 
// если применять в вершинном шейдере)

// Параметр inout - это что-то вроде необязательного (для установки) out-параметра.
// Если вместо этого указать просто out, то результат будет некорректным, 
// т.к. out-параметр, похоже, нужно устанавливать обязательно.
void calcReflection(vec4 tPos, vec4 tNormal, vec3 lightingPos, 
  out float lambertTerm, inout float specularValue) {

  vec3 eye = normalize(-tPos.xyz);
  vec3 normal = normalize(tNormal.xyz);
  vec3 dirToLight = normalize(lightingPos);

  lambertTerm = max(dot(normal, -dirToLight), 0.0);
  if (lambertTerm > 0.0) {
    vec3 halfDir = normalize(-dirToLight + eye);
    float angle = max(dot(halfDir, normal), 0.0);
    specularValue = pow(angle, 16.0);
  }
}

vec4 calcLighting(vec4 tPos, vec4 tNormal, vec3 lightingPos, 
  vec3 ambientColor, vec3 diffuseColor, vec3 specularColor) {

  float lambertTerm;
  float specularValue;
  calcReflection(tPos, tNormal, lightingPos, lambertTerm, specularValue);

  diffuseColor *= lambertTerm;
  specularColor *= specularValue;

  return vec4(ambientColor + diffuseColor + specularColor, 1.0);
}

void main() {
  v_Texcoord = a_Texcoord;

  vec4 tPos = u_MVMatrix * a_Position;

  v_Color = calcLighting(tPos, u_NMatrix * a_Normal, u_LightingPos, 
    u_AmbientColor * u_MaterialAmbientColor, u_DiffuseColor, 
    u_SpecularColor * u_MaterialAmbientColor);

  gl_Position = u_PMatrix * tPos;
}