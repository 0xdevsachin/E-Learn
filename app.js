require('dotenv').config();
const express = require('express')
const path = require('path')
const http = require('http');
const app = express()
const jet = require('jsonwebtoken')
const port = process.env.PORT || 3000;
const bcrypt = require('bcryptjs')
const cookiezz = require('cookie-parser')
const auth = require('../elearn/auth')
var hbs = require('hbs');
var modules = require('./db');
const { ESRCH } = require('constants');
const { Console } = require('console');
app.use('/static', express.static('static')) // for using static files 
app.use(express.urlencoded({ extended: false })) //Get Post Data
app.use(cookiezz()); // To get the cookies from webpage  the cookies
app.set('public_html', path.join(__dirname + 'public_html')) //setting up the HTML Directory
app.set('view engine', 'hbs') //Setup view engine

/*    Get Methods   */

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public_html' })
})

app.get('/login', async(req, res) => {
    try {
        var cooki1 = req.cookies.elearn
        var userid1 = jet.verify(cooki1, process.env.JWTKEY)
        var person1 = await modules.findOne({ _id: userid1._id })
        res.render('dashboard', {
            user: {
                name: person1.user
            }
        })
    } catch (error) {
        //console.log(error)
        res.render('login')
    }
})

app.post('/logout', auth, async(req, res) => {
        try {
            res.clearCookie('elearn')
            console.log('logout Successfully')
            res.render('login')
        } catch (error) {
            console.log(error)
        }
    })
    /* Post Methods */

app.post('/login', async(req, res) => {
    var email = req.body.user
    var pass = req.body.password
    var userid = await modules.findOne({ user: email })
    if (userid) {
        if (bcrypt.compare(pass, userid.pass)) {
            var tokenx = await userid.auth();
            res.cookie('elearn', tokenx);
            res.render('dashboard', {
                user: {
                    name: email
                }
            })
        } else {
            res.send('Check your Credentials')
        }
    } else {
        res.send('Check your Credentials')
    }
})

app.post('/register', async(req, res) => {
    var dbdata = new modules(req.body)
    var emails = await modules.findOne({ email: req.body.email })
    var usernames = await modules.findOne({ user: req.body.user })
    if (req.body.pass === req.body.cpass) {
        if (usernames) {
            res.render('login', {
                main: {
                    message: 'userbox'
                }
            })
        } else if (emails) {
            res.render('login', {
                main: {
                    message: 'emailbox'
                }
            })
        } else {
            var tokens = await dbdata.auth();
            res.cookie('elearn', tokens, {
                httpOnly: true
            });
            dbdata.save().then(() => {
                res.render('login', {
                    main: {
                        message: 'alertbox'
                    }
                })
            }).catch(
                () => {
                    res.render('login', {
                        main: {
                            message: 'server'
                        }
                    })
                }
            )
        }
    } else {
        res.render('login', {
            main: {
                message: 'comparepass'
            }
        })
    }
})
app.get('/watch', auth, async(req, res) => {
    var cooki = req.cookies.elearn
    var userid = jet.verify(cooki, process.env.JWTKEY)
    var persons = await modules.findOne({ _id: userid._id })
    res.render('watch', {
        person: {
            name: persons.user,
            gender: persons.gender
        }
    })
})

app.listen(port, () => {
    console.log(`Server running at ${port}/`);
});