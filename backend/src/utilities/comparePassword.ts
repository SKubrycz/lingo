const bcrypt = require('bcrypt');

const comparePassword = (input, hash) => {
    console.log(`comparePassword: `);
    const compare = bcrypt.compare(input, hash);
    if (compare) console.log(`comparison successful!`);

    return compare;
}

module.exports = comparePassword;