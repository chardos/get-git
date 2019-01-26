var exec = require('child_process').exec
const { parseStdOut } = require('./helpers');
const { SEPARATOR } = require('./constants');

function _command (cmd, cb) {
  exec(cmd, function (err, stdout, stderr) {
    cb(stdout.split('\n').join(''))
  })
}

module.exports = {
  log : function (cb) {
    var SEPARATOR = '<SEPARATOR>';
    var cmd = 'git log --no-color --pretty=format:\'[ "%h", "%s", "%at000", "%an" ],\' --abbrev-commit';
    cmd = cmd.replace(/"/g, SEPARATOR);
    _command(cmd, function (str) {
      const json = parseStdOut(str, SEPARATOR);
      cb(json)
    })
  },
  log2: () => {
    const SEPARATOR = '<SEPARATOR>';
    const cmd = 'git log --no-color --pretty=format:\'[ "%h", "%s", "%at000", "%an" ],\' --abbrev-commit';
  },
  short : function (cb) {
    _command('git rev-parse --short HEAD', cb)
  }, 
  
  long : function (cb) {
    _command('git rev-parse HEAD', cb)
  }, 
  
  branch : function (cb) {
    _command('git rev-parse --abbrev-ref HEAD', cb)
  }, 
  
  tag : function (cb) {
    _command('git describe --always --tag --abbrev=0', cb)
  }, 
}
