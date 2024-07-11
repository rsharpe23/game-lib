export function add(item) {
  this.items.push(item);
}

export function remove(item) {
  this.items.remove(item);
}

export function find(itemName) {
  return this.items.find(item => item.name === itemName);
}