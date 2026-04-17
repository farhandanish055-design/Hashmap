const HashMap = require("./hashmap");

const map = new HashMap();

map.set('apple', 'red')
map.set('banana', 'yellow')
map.set('carrot', 'orange')
map.set('dog', 'brown')
map.set('elephant', 'gray')
map.set('frog', 'green')
map.set('grape', 'purple')
map.set('hat', 'black')
map.set('ice cream', 'white')
map.set('jacket', 'blue')
map.set('kite', 'pink')
map.set('lion', 'golden')

console.log(map.length()); // 12

map.set('moon', 'silver') // trigger resize

console.log(map.capacity); // 32

console.log(map.keys());
console.log(map.values());
console.log(map.entries());