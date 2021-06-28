const mongoose = require("mongoose")
const User = require("../../models/user")

const userModel = new mongoose.model('Users', User.Schema)

const getbyId = async (id) => {
    const res = await userModel.find({ _id: id }, (err, result) => result)
    return res
}

const getbyUsername = async (username) => {
    const res = await userModel.find({ username: username }, (err, result) => result)
    return res
}

const insert = async (entry) => {
    if (await getbyUsername(entry.username).then(a => a.length) > 0) throw "no"
    const doc = new userModel(entry.serialize())
    doc.save().catch(err => { throw err })
}

const update = async (entry) => {
    await userModel.updateOne({ username: entry.username }, entry)
}

const updatebyId = async (entry) => {
    await userModel.updateOne({ _id: entry._id }, entry)
}

const authenthicate = async (name, password) => {
    try {
        const user = await new User(await getbyUsername(name).then(a => a[0]))
        return (user.password === password)
    } catch (err) {
        return -1
    }
}

module.exports = { insert, getbyId, getbyUsername, update, updatebyId, authenthicate }