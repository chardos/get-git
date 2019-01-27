const exec = require('child_process').exec
const { parseStdout } = require('./helpers');
const { SEPARATOR, OPTION_MAP } = require('./constants');

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
  log: function (...options) {
    let cmd = `git log --no-color --pretty=format:'{ 
      "commitHash": "%h", 
      "commitMessage": "%s", 
      "timestamp": "%at000", 
      "authorName": "%an" 
    },' --abbrev-commit`;
    cmd = cmd.replace(/"/g, SEPARATOR);

    return new Promise(resolve => {
      _command(cmd).then(stdout => {
        const json = parseStdout(stdout);
        resolve(json)
      })
    })
  },

  short: () => _command('git rev-parse --short HEAD'),
  
  long: () => _command('git rev-parse HEAD'),
  
  branch: () => _command('git rev-parse --abbrev-ref HEAD'),
  
  tag: () => _command('git describe --always --tag --abbrev=0'),
}
