const { UserModel } = require("../models/User.model")
const express = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = express.Router()

//register
userRouter.post("/register", async (req, res) => {
    const { email, pass, name, age } = req.body
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            const user = new UserModel({ email, name, age, pass: hash })
            await user.save()
            res.status(200).send({ "msg": "New user registered successfully" })
        });

    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
})


//login
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(pass, user.pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ authorID:user._id,author:user.name }, 'hustle', { expiresIn: '1h' });
                    res.status(200).send({ "msg": "Login Successful", "token": token })
                }else{
                    res.status(200).send({ "msg": "Wrong credentials" })
                }
            });

        }
        else {
            res.status(200).send({ "msg": "Wrong credentials" })
        }
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }


})



module.exports = { userRouter }

