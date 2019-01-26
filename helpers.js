

exports.parseStdOut = (stdOut, separator) => {
  stdOut = stdOut.substr(0, stdOut.length-1);
  stdOut = stdOut.replace(/"/g, '\\"');
  stdOut = stdOut.replace(new RegExp(separator,'g'), '"');
  return JSON.parse('[' + stdOut + ']');
}

function trimLastChar(str) {
  return str.substr(0, str.length-1);
}