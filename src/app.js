// Контекст webgl можно создать и динамически (см. demo fxaa)
const canvas = document.getElementById('canvas');

const webglOpts = {
  // antialias: false,
};

const fpsElem = document.getElementById('fps');
const fps = deltaTime => Math.round(1 / deltaTime * 1000);

// Производильтеность CPU определяется с пом. разницы 2х временных меток, 
// перед началом выполнения ф-ции и после окончания выполнения.

// Производительность GPU можно определить с пом. дельты времени между кадрами, 
// чем меньша дельта, тем быстрее выполнена работа (CPU + GPU) и тем больше fps.

// TODO: Переделать в класс и через конструктор передавать все необходимые 
// данные: программу, сцену, id канваса или сразу контекст webgl

export default {
  props: {
    gl: canvas.getContext('webgl', webglOpts),
    dataset: canvas.dataset,
    store: new Map(),
    prog: null,
    scene: null,
    deltaTime: 0,
    time: 0,
  },

  // trigger: true,
  // count: 0,

  // report() {
  //   this.trigger = false;
  //   console.log(this.count);
  // },

  get loop() {
    return this._loop ??= elapsedTime => {
      // if (!this.trigger) return;

      const props = this.props;
      props.deltaTime = elapsedTime - props.time;
      props.time = elapsedTime;
      props.scene.update(props)

      // this.count += benchmark(() => props.scene.update(props));
      
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
