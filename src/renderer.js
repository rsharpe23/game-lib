export default class {
  _isReady = false;

  // render(appProps) {
  //   if (this._isReady) {
  //     this._render(appProps);
  //     return;
  //   }

  //   this._beforeRender?.(appProps);
  //   this._isReady = true;
  // }

  render(appProps) {
    if (!this._isReady) {
      this._beforeRender?.(appProps);
      this._isReady = true;
    }

    this._render(appProps);
  }

  _render(appProps) {
    throw new Error('Not implemented');
  }
};