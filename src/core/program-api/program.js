export default class {
  constructor(glProg) {
    this.glProg = glProg;
  }

  setLocationProps(gl, locations) {
    for (const { name, qualifier } of locations) {
      const action = qualifier === 'attribute' ? 'getAttribLocation' :
        qualifier === 'uniform' ? 'getUniformLocation' : '';

      if (!action) {
        throw new Error(`Incorrect qualifier: ${qualifier}`
          + ` of location: ${name}`);
      }

      this[name] = gl[action](this.glProg, name);
    }
  }
}
