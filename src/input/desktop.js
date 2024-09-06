export default class {
  mouse = { x: 0, y: 0 };

  constructor(canvas) {
    canvas.addEventListener('mousemove', e => {
      const mouse = this.mouse;
      mouse.x = e.movementX;
      mouse.y = e.movementY;
    });
  }
};