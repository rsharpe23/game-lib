// Контекст webgl можно создать и динамически (см. demo fxaa)
const elem = document.getElementById('app');

const webglOpts = {
  // antialias: false,
};

const fpsElem = document.getElementById('fps');
const fps = deltaTime => Math.round(1 / deltaTime * 1000);

export default {
  props: {
    gl: elem.getContext('webgl', webglOpts),
    shaderDir: elem.dataset.shaderDir,
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

      // Любое проверочное число меньше делителя с остатком на 20 
      // if (Math.round(elapsedTime % 300) > 280) {
      //   fpsElem.textContent = `FPS: ${fps(props.deltaTime)}`;
      // }

      // TODO: Приостанавливать цикл, когда приложение теряет фокус
      requestAnimationFrame(this.loop);
    };
  },

  watchFps() {
    setInterval(() => {
      fpsElem.textContent = `FPS: ${fps(this.props.deltaTime)}`;
    }, 300);
  },

  // TODO: Добавить 2 метода: stop() и resume()
};
