export const degToRad = value => value * Math.PI / 180;

export const isPowerOf2 = value => (value & (value - 1)) === 0;

export const clamp = (value, min, max) => 
  Math.min(Math.max(value, min), max);