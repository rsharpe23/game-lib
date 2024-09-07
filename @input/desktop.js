export default class {
  screen = {
    dx: 0, dy: 0, 
  
    reset(timeout) {
      clearTimeout(this._resetTimer);
      this._resetTimer = setTimeout(this._reset.bind(this), timeout);
    },
  
    _reset() {
      this.dx = 0;
      this.dy = 0;
    }
  };

  horizontal = 0;
  vertical = 0;

  constructor(canvas) {
    canvas.addEventListener('mousemove', e => {
      // В доке указано, что movement может возвращать разные 
      // единицы измеренеия на разных устройствах
      const screen = this.screen;
      screen.dx = e.movementX;
      screen.dy = e.movementY;
      screen.reset(0);
    });

    document.addEventListener('keydown', e => {
      switch (e.code) {
        case 'KeyA': this.horizontal = -1; break;
        case 'KeyD': this.horizontal =  1; break;
        case 'KeyW': this.vertical =  1; break;
        case 'KeyS': this.vertical = -1; break;
      }
    });

    document.addEventListener('keyup', e => {
      if (e.code === 'KeyA' || e.code === 'KeyD')
        this.horizontal = 0;

      if (e.code === 'KeyW' || e.code === 'KeyS')
        this.vertical = 0;
    });
  }
};