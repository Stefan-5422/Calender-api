const express = require("express")
const router = express.Router()

const assets = require("../src/entry/entryController")
const user = require("../src/user/userController")

router.use("/entries",assets)
router.use("/users",user)

router.get("/", async (req,res) => {
    res.send("This works?")
}) 

module.exports = router;