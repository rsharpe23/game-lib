import '../lib/global-ext.js';
import Node from "../src/node.js";

const scene = new Node('Scene');

const tank = new Node('Tank');

const tower = new Node('Tower');
const burrel = new Node('Burrel');
tower.addChild(burrel);
tank.addChild(tower);

tank.addChild(new Node('Hull'));

scene.addChild(tank);

scene.addChild(new Node('Tank2'));
scene.addChild(new Node('Tank3'));

burrel.setParent(scene);
console.log(scene);