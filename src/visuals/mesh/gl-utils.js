import { setAttribute as gluSetAttribute, 
  drawElements as gluDrawElements } from '../../../lib/gl-utils.js';

export const setAttribute = (gl, store, attr, buffer) => {
  gluSetAttribute(gl, attr, buffer.glBuffer(gl, store), 
    buffer.typeSize, buffer.componentType);
};

export const drawElements = (gl, store, buffer) => {
  gluDrawElements(gl, buffer.glBuffer(gl, store), 
    buffer.count, buffer.componentType);
};