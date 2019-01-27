const { SEPARATOR } = require('./constants');

exports.parseStdout = (stdout) => {
  stdout = stdout.split('\n').join('')
  stdout = trimLastChar(stdout)
  stdout = stdout.replace(/"/g, '\\"');
  stdout = stdout.replace(new RegExp(SEPARATOR,'g'), '"');
  return JSON.parse('[' + stdout + ']');
}

function trimLastChar(str) {
  return str.substr(0, str.length-1);
}