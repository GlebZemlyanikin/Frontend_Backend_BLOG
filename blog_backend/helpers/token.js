const jwt = require('jsonwebtoken');

const sign = process.env.JWT_SECRET;

module.exports = {
    generate(dats) {
        return jwt.sign(dats, sign, { expiresIn: '30d' });
    },
    verify(token) {
        return jwt.verify(token, sign);
    },
};
