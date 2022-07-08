const express = require('express');
const Model = require('../Models/Model');
const ContactModel = require('../Models/ContactFeedback');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Authenticate = require('../Middleware/Authenticate');
const cookieParser = require("cookie-parser");

const router = express.Router();

dotenv.config({ path: './config.env' });

require('../Models/Conn');

router.use(cors());
router.use(cookieParser());


router.post('/Register', (req, res) => {
    const { name, email, number, profession, password, c_password } = req.body;
    if (!name || !email || !number || !profession || !password || !c_password) {
        res.status(422).json({ error: "Please give the all details properly" })
    }
    Model.findOne({ email: email }).then((isExist) => {
        if (isExist) {
            res.status(422).json({ error: "Email already exists" });
        }
        const NewUser = new Model({ name, email, number, profession, password, c_password });
        NewUser.save().then(() => {
            alert("User registered successfully");
        }).catch((err) => {
            res.status(201).json({ message: "User registered successfully" });
        })
    }).catch((error) => {
        res.status(422).json({ error: error });
    });
});

router.post('/Login', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(422).json({ error: "Please give the login details properly" })
        }

        const isValid = await Model.findOne({ email: email });

        if (isValid) {
            const isMatch = await bcrypt.compare(password, isValid.password);
            token = await isValid.generateAuthToken();

            res.cookie("access_token", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(422).json({ error: "Incorrect login details" });
            }
            else {
                res.status(201).json({ message: "Login successfull" });
            }
        }
        else {
            res.status(422).json({ error: "Incorrect Credientials" });
        }
    } catch (error) {
        console.log(error);
    }
});

router.post('/Contact', (req, res) => {
    const { name, email, profession, feedback } = req.body;

    if (!name || !email || !profession || !feedback) {
        res.status(422).json({ error: "Please give the feedback properly" });
        return;
    }
    const getfeed = new ContactModel({ name, email, profession, feedback });

    getfeed.save().then(() => {
        res.status(201).json({ message: "Thanks for giving us feedback" });
        return;
    }).catch(() => {
        res.status(422).json({ error: "Something error occured" });
        return;
    })
});



router.get('/About', Authenticate, (req, res) => {
    // res.cookie("Test", 'Bishnudev');
    res.send(req.rootUser);
});

router.get('/Logout', (req, res) => {
    res.clearCookie("access_token", { path: "/" });
    res.status(200).send('User Logged Out');
});

module.exports = router;