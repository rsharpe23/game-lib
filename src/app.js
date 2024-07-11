import Program from './core/program.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const program = await Program.load();
const { mat4 } = glMatrix;

export default {
  props: {
    gl, prog: program(gl),
    matrices: {
      projection: mat4.create(),
      view: mat4.create(),
    },
    deltaTime: 0,
    store: {},
  },

  run(updatable) {
    let time = performance.now();

    const loop = elapsedTime => {
      this.props.deltaTime = elapsedTime - time;
      updatable.update(this.props);
      time = elapsedTime;
      requestAnimationFrame(loop);
    };

    loop(time);
  }
};