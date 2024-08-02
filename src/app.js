const elem = document.getElementById('canvas');
const renderProps = { antialias: false };

export default {
  props: {
    gl: elem.getContext('webgl', renderProps),
    prog: null,
    updatable: null,
    store: new WeakMap(),
    deltaTime: 0,
    time: 0,
  },

  get loop() {
    return this._loop ??= elapsedTime => {
      const props = this.props;
      props.deltaTime = elapsedTime - props.time;
      props.time = elapsedTime;
      props.updatable.update(props);
      // TODO: Приостанавливать цикл, когда приложение теряет фокус
      requestAnimationFrame(this.loop);
    };
  },
  
  // TODO: Добавить 2 метода: stop() и resume()
};