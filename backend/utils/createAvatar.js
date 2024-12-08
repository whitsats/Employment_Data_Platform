const identicon = require("identicon");

function cravatar(username) {
    return (
        "data:image/jpeg;base64," +
        identicon.generateSync({ id: username, size: 100 }).toString("base64")
    );
}
module.exports = cravatar;
