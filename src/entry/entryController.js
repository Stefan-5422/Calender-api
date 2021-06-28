const express = require("express")
const router = express.Router()
const Entrie = require("../../models/entry")
const users = require("../user/userModel")
const model = require("./entryModel")
const auth = require("../util/auth")

router.get("/", async (req, res) => {
    if (!auth.verify(req.headers.authorization[1])) {
        res.status(403).json("")
        return
    }
    const user = await users.getbyId(auth.decrypt(req.headers.authorization[1]).id).then(a => a[0])
    res.json(await model.getbyIds(user.entries))
})

router.post("/add", async (req, res) => {
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
    res.status(200).json("")
})

module.exports = router;