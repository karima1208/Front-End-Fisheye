const response = await fetch('../../data/photographers.json');
const data = await response.json();
console.log (data)