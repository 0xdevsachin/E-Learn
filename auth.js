const jwttokens = require('jsonwebtoken')
const regster = require('./db')

// Verification of JWT Token for Authentication
const auth = async(req, res, next) => {
    try {
        var cook = req.cookies.elearn
        const verify = jwttokens.verify(cook, process.env.JWTKEY)
            // console.log(verify)
        const user = await regster.findOne({ _id: verify._id })
        console.log(user.user)
        next()
    } catch (error) {
        res.sendFile('login.html', { root: __dirname + '/public_html' })
    }
}

module.exports = auth;