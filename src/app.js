import Program from './core/program.js';

const canvas = document.getElementById('canvas');
const gl = canvas.getContext('webgl');

export default {
  props: {
    gl, prog: Program.fromOwnShaders(gl),
    store: new WeakMap(),
    updatable: null,
    deltaTime: 0,
    time: 0,
  },

  get loop() {
    return this._loop ??= elapsedTime => {
      const props = this.props;
      props.deltaTime = elapsedTime - props.time;
      props.time = elapsedTime;
      props.updatable.update(props);
      requestAnimationFrame(this.loop);
    };
  },

  run(updatable) {
    this.props.updatable = updatable;
    this.loop(performance.now());
  },
};