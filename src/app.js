import Program from './core/program.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const prog = await Program.create(gl);
const { mat4 } = glMatrix

export default {
  props: {
    canvas, gl, prog,
    matrices: {
      projection: mat4.create(),
      modelView: mat4.create(),
      normal: mat4.create(),
    },
    store: {},
  },

  run(renderer) {
    let time = performance.now();

    const render = elapsedTime => {
      renderer.render(this.props, elapsedTime - time);
      time = elapsedTime;
      requestAnimationFrame(render);
    };

    render(time);
  }
};