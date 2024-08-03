precision mediump float;
#define GLSLIFY 1

uniform sampler2D u_Sampler;
varying vec3 v_Color;
varying vec2 v_Texcoord;

// glsl-fxaa нужно все таки устанавливать в dependencies, 
// поскольку это часть проекта, как и другие шейдеры, 
// а лучше вообще перенести в папку shaders

// Еще лучше, компилировать шейдеры не в *.build.glsl, 
// а в отдельный бандл /build/shaders.js

// По итогу все ресурсы загружаются вместе, одним архивом/бандлом, 
// т.к. на локальном клиенте нет возможности проверить, 
// что игроку надо, а что нет.

// #pragma glslify: fxaa = require(glsl-fxaa)

void main(void) {
  gl_FragColor = vec4(v_Color, 1.0) * texture2D(u_Sampler, v_Texcoord);

  // Это нужно применять не к отдельным обьектам, а ко всему экрану сразу, 
  // подобно тому как реализуются постэффекты через framebuffer

  // vec2 resolution = vec2(2048.0, 2048.0);
  // gl_FragColor = fxaa(u_Sampler, v_Texcoord * resolution, resolution);
}
