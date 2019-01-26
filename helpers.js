const { SEPARATOR } = require('./constants');

exports.parseStdOut = (stdOut, SEPARATOR) => {
  stdOut = trimLastChar(stdOut)
  stdOut = stdOut.replace(/"/g, '\\"');
  stdOut = stdOut.replace(new RegExp(SEPARATOR,'g'), '"');
  return JSON.parse('[' + stdOut + ']');
}

function trimLastChar(str) {
  return str.substr(0, str.length-1);
}