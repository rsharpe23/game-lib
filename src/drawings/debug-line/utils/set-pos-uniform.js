const positions = [0, 0, 0, 1, 0, 0, 0, 1];

export default (gl, prog, startPos, endPos) => {
  positions[0] = startPos[0];
  positions[1] = startPos[1];
  positions[2] = startPos[2];

  positions[4] = endPos[0];
  positions[5] = endPos[1];
  positions[6] = endPos[2];

  // for (let i = 0; i < 3; i++) {
  //   positions[i] = startPos[i];
  //   positions[i + 4] = endPos[i];
  // }

  gl.uniform4fv(prog.u_Positions, positions);
};