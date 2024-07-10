import Program from './core/program.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const program = await Program.load();
const { mat4 } = glMatrix;

export default {
  props: {
    canvas, gl, 
    prog: program(gl),
    matrices: {
      projection: mat4.create(),
      view: mat4.create(),
    },
    deltaTime: 0,
    store: {},
  },

  run(renderer) {
    let time = performance.now();

    const render = elapsedTime => {
      this.props.deltaTime = elapsedTime - time;
      renderer.render(this.props);
      time = elapsedTime;
      requestAnimationFrame(render);
    };

    render(time);
  }
};