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

export const createShader = (gl, type, text) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, text);
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

export const setAttribute = (gl, store, attr, buffer) => {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer.buffer(gl, store));
  gl.enableVertexAttribArray(attr);
  gl.vertexAttribPointer(attr, buffer.typeSize, 
    buffer.componentType, false, 0, 0);
};

export const drawElements = (gl, store, buffer) => {
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.buffer(gl, store));
  gl.drawElements(gl.TRIANGLES, buffer.count, 
    buffer.componentType, 0);
};

const setMatrixUniform = (gl, uniform, matrix) => {};