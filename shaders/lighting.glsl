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

#pragma glslify: export(calcLighting)