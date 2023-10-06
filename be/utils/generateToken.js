const jwt = require('jsonwebtoken');

function generateToken( userId ) {
    console.log(userId)
    return jwt.sign(
        { 
            userId
        },
        "RANDOM-SECRET-TOKEN",
        {expiresIn : "30d"}
    )
}

module.exports = generateToken;