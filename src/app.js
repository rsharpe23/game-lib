import Program from './core/program.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');
const program = await Program.load();

export default {
  props: {
    gl, prog: program(gl),
    updatable: null,
    deltaTime: 0,
    time: 0,
    store: {},
  },

  get loop() {
    if (!this._loop) {
      this._loop = elapsedTime => {
        const props = this.props;
        props.deltaTime = elapsedTime - props.time;
        props.time = elapsedTime;
        props.updatable.update(props);
        requestAnimationFrame(this.loop);
      };
    }

    return this._loop;
  },

  run(updatable) {
    this.props.updatable = updatable;
    this.loop(performance.now());
  },
};