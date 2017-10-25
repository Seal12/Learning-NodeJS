var msg = require("./my_module");
console.log(msg);

var passing_msg = require("./passing_msg");
passing_msg.log("Hello from the other side.");

var reply = require("./other")("Steve");
console.log(reply);

console.log(module.id);