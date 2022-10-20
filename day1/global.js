console.log(window); // Browser
console.log(global); // Node

// Set timeout for 3 seconds
setTimeout(function() {
    console.log("Timeout");
    clearInterval(interval);
}, 3000);

// Set interval for every 1 second
const interval = setInterval(function() {
    console.log("Interval");
}, 1000);

// Absolute Path of current folder
console.log(__dirname);

// Absolute Path of current filename
console.log(__filename);

// Output
// D:\Projects\qinetics
// D:\Projects\qinetics\index.js