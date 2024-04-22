const bcrypt = require('bcrypt');

const hashData = async (password) => {
    const hashedPassword = bcrypt.hash(password, 10);

    return hashedPassword;
}

module.exports = hashData;