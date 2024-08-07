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

#pragma glslify: export(calcLighting)