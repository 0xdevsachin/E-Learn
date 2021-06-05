require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://mongogang:${process.env.DB_KEY}@cluster0.q6fsn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Register = mongoose.Schema({
    user: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    pass: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

// Generating JWT Token

Register.methods.auth = async function() {
    try {
        const gentoken = jwt.sign({ _id: this._id }, process.env.JWTKEY)
        this.tokens = this.tokens.concat({ token: gentoken })
        return gentoken
    } catch (error) {
        console.log(error)
    }
}


// Hashing the Password
Register.pre("save", async function(next) {
    this.pass = await bcrypt.hash(this.pass, 10)
    next()
})

const reg = mongoose.model('register', Register)



module.exports = reg;