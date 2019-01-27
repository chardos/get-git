var exec = require('child_process').exec
const { parseStdOut } = require('./helpers');
const { SEPARATOR } = require('./constants');

function _command (cmd, cb) {
  exec(cmd, function (err, stdout, stderr) {
    cb(stdout)
  })
}

module.exports = {
  log : function (cb) {
    var cmd = 'git log --no-color --pretty=format:\'[ "%h", "%s", "%at000", "%an" ],\' --abbrev-commit';
    cmd = cmd.replace(/"/g, SEPARATOR);

    return new Promise(resolve => {
      _command(cmd, function (str) {
        const json = parseStdOut(str);
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
