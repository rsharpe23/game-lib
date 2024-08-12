export default class {
  constructor(glProg) {
    this.glProg = glProg;
  }

  setLocations(gl, data) {
    for (const [qualifier, name] of data) {
      const action = qualifier === 'attribute' ? 'getAttribLocation' :
        qualifier === 'uniform' ? 'getUniformLocation' : '';

      if (!action) {
        throw new Error(`Incorrect qualifier: ${qualifier}`
          + ` of location: ${name}`);
      }

      this[name] = gl[action](this.glProg, name);
    }
  }

  use(gl) {
    // Вызов getParameter(gl.CURRENT_PROGRAM) не следует использ.
    // в цикле отрисовки, т.к. эта ф-ция влияет на производительность
    const { glProg } = this;
    if (gl.prog === glProg) return;
    gl.useProgram(gl.prog = glProg);
  }
}
