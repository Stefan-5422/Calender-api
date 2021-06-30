const express = require("express")
const cryptojs = require("crypto-js")
const User = require("../../models/user")
const router = express.Router()
const model = require("./userModel")
const jwt = require("jsonwebtoken")

router.get("/settings", async (req, res) => {
    if (!auth.verify(req.headers.authorization[1])) {
        res.status(403).json("")
        return
    }
    const user = await users.getbyId(auth.decrypt(req.headers.authorization[1]).id).then(a => a[0])
    res.json(user.settings)
})

router.post("/register", async (req, res) => {
    let user
    try {
        user = new User(req.body)
        user.password = cryptojs.SHA256(req.body.password).toString()
        await model.insert(user)
    } catch (err) {
        (user == undefined) ?
            res.status(400).send("") :
            res.status(409).send("")
        return;
    }
    res.status(201).send("")
})

router.post("/auth", async (req, res) => {
    try {
        const user = new User(req.body)
    } catch (err) {
        console.log(err)
        res.status(400).send("")
        return
    }
    const re = await model.authenthicate(req.body.username, cryptojs.SHA256(req.body.password).toString())

    if (re == true) {
        const val = { id: await model.getbyUsername(req.body.username).then(a => a[0]._id) }
        res.status(200).json({ auth: { access_token: jwt.sign(val, process.env.SECRET, { expiresIn: '1d' }) } })
        return
    } else {
        res.status(401).json("")
        return
    }

})

router.put("/", async (req, res) => {
    if (!auth.verify(req.headers.authorization[1])) {
        res.status(403).json("")
        return
    }
    const user = await users.getbyId(auth.decrypt(req.headers.authorization[1]).id).then(a => a[0])

    if (!req.body) {
        res.status(400).json("")
    }
    const newuser = {
        username: req.body.username ?? user.username,
        password: cryptojs.SHA256(req.body.password) ?? user.password,
        settings: req.body.settings ?? user.settings,
        _id: user._id,
    }
    model.updatebyId(newuser)
})

module.exports = router;