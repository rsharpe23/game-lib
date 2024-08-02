// TODO: Этот модуль можно вообще вынести в lib, 
// но для этого нужно убрать некоторые связи с ядром, 
// в часности параметры: store, buffer, prog.

// В этом случае исчезнуть коллизии между gl-util и api ядра, 
// что позволит по сути экспорироват и ядро

export const createProgram = (gl, vs, fs) => {
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);

  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('Program link error');
  }

  return prog;
};

export const createShader = (gl, type, src) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(`Shader error: ${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
};

export const createBuffer = (gl, data, target) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(target, buffer);
  gl.bufferData(target, data, gl.STATIC_DRAW);
  return buffer;
};

export const createTexture = (gl, img, isPowerOf2) => {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

  if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
    gl.generateMipmap(gl.TEXTURE_2D);
  } else {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  }

  return texture;
};

// getParameter(gl.CURRENT_PROGRAM) влияет на производительность. 
// Эту ф-цию лучше не использовать в цикле отрисовки
export const useProgram = (gl, prog) => {
  if (prog === gl.currentProg) return;
  gl.currentProg = prog;
  gl.useProgram(prog.glProg);
};

export const setMatUniform = (gl, uniform, matrix) => {
  gl.uniformMatrix4fv(uniform, false, matrix);
};

export const setTexUniform = (gl, uniform, texture, unitIndex = 0) => {
  gl.activeTexture(gl.TEXTURE0 + unitIndex);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(uniform, unitIndex);
};

export const setAttribute = (gl, store, attr, buffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.glBuffer(gl, store));
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, buffer.typeSize, 
    buffer.componentType, false, 0, 0);
};

export const drawElements = (gl, store, buffer) => {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.glBuffer(gl, store));
  gl.drawElements(gl.TRIANGLES, buffer.count, 
    buffer.componentType, 0);
};