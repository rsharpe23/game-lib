export default class {
  _isReady = false;

  render(appProps, deltaTime) {
    if (this._isReady) {
      this._render(appProps, deltaTime);
      return;
    }

    this._beforeRender?.(appProps);
    this._isReady = true;
  }

  _render(appProps, deltaTime) {
    throw new Error('Not implemented');
  }
}