#!/usr/bin/env node

// Delete the 0 and 1 argument (node and script.js)
var args = process.argv.splice(process.execArgv.length + 2);
// Retrieve the first argument
var generate = args[0];
var componentType = args[1];
var componentName = args[2];

var app = require('../src/app.js');

// Displays the text in the console
app.waitForUserInput(generate,  componentType, componentName);
// app.say(name + ', get back, come on before we crack Lose your blues, everybody cut footloose');