var path = require('path');
var fs = require('fs');

var gitdir = path.join(__dirname, '../../.git');
var hooksdir = path.join(gitdir, 'hooks');

if (!fs.existsSync(gitdir)) return;
if (!fs.existsSync(hooksdir)) fs.mkdirSync(hooksdir);

var name = 'commit-msg';
var hookPath = path.join(hooksdir, name);
var hook = fs.readFileSync(path.join(__dirname, name));

if (fs.existsSync(hookPath) && fs.readFileSync(hookPath, 'utf-8').indexOf('generate by git-pre-hooks') < 0) {
  fs.writeFileSync(hookPath + '.back', fs.readFileSync(hookPath));
}

fs.writeFileSync(hookPath, hook);
fs.chmodSync(hookPath, '755');
