const exec = require('child_process').exec
const { parseStdout } = require('./helpers');
const { SEPARATOR } = require('./constants');

function _command (cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, function (err, stdout, stderr) {
      if (err) return reject(err);
      if (stderr) return reject(stderr);
      resolve(stdout)
    })
  })
}

module.exports = {
  log: function () {
    let cmd = 'git log --no-color --pretty=format:\'[ "%h", "%s", "%at000", "%an" ],\' --abbrev-commit';
    cmd = cmd.replace(/"/g, SEPARATOR);

    return new Promise(resolve => {
      _command(cmd).then(stdout => {
        const json = parseStdout(stdout);
        resolve(json)
      })
    })
  },

  short: function (cb) {
    _command('git rev-parse --short HEAD', cb)
  }, 
  
  long: function (cb) {
    _command('git rev-parse HEAD', cb)
  }, 
  
  branch: function (cb) {
    _command('git rev-parse --abbrev-ref HEAD', cb)
  }, 
  
  tag: function (cb) {
    _command('git describe --always --tag --abbrev=0', cb)
  }, 
}
