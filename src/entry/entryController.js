const express = require("express")
const router = express.Router()
const Entrie = require("../../models/entry")
const users = require("../user/userModel")
const model = require("./entryModel")
const auth = require("../util/auth")
const format = require("../util/format")

router.get("/", async (req, res) => {
    if (!auth.verify(req.headers.authorization[1])) {
        res.status(403).json("")
        return
    }
    const user = await users.getbyId(auth.decrypt(req.headers.authorization[1]).id).then(a => a[0])
    var a = await model.getbyIds(user.entries)
    a = Array.from(a)
    a = a.map(element => {
        element = format.formatEntry(element)
        return element
    })
    res.json(a)
})

router.post("/", async (req, res) => {
    if (!auth.verify(req.headers.authorization[1])) {
        res.status(403).json("")
        return
    }
    const user = await users.getbyId(auth.decrypt(req.headers.authorization[1]).id).then(a => a[0])

    let entry

    try {
        entry = new Entrie(req.body)
    } catch (err) {
        res.status(400).json("")
        return
    }
    const id = await model.insert(entry)
    user.entries.push(id)
    users.update(user)
    res.status(201).json("")
})

module.exports = router;