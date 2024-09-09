import { find, findAll } from '../../lib/node-utils.js';
import Object from '../object.js';

export default class extends Object {
  parent = null;
  children = [];

  appendChild(child) {
    child.setParent(this);
  }

  removeChild(child) {
    if (!this.children.includes(child)) return;
    child.setParent(null);
  }

  setParent(value) {
    if (value === this || value === this.parent) return;
    this.parent?.onRemoveChild(this);
    value?.onAppendChild(this);
    this.parent = value;
  }

  onRemoveChild(child) {
    this.children.remove(child);
  }

  onAppendChild(child) {
    this.children.push(child);
  }

  findChild(name) {
    return find(this, child => child.name === name);
  }

  findChildren(tag) {
    return findAll(this, child => child.tag === tag);
  }

  update(appProps) {
    super.update(appProps);
    for (const child of this.children)
      child.update(appProps);
  }
}