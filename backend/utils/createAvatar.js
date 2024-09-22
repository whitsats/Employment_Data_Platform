const Crypto = require('crypto');

function gravatar(mail) {
  let size = 100
  let hash = Crypto.createHash('md5').update(mail.trim().toLowerCase()).digest("hex")
  return `http://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}
module.exports = gravatar