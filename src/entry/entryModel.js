const mongoose = require("mongoose")
const Entrie = require("../../models/entry")

const entrieModel = new mongoose.model('Entrie', Entrie.Schema)

const insert = async (entrie) => {
    const doc = new entrieModel(entrie.serialize())
    return doc.save().catch(err => { throw err }).then(a => a._id)
}

const getbyId = async (id) => {
    const res = await entrieModel.find({ _id: id }, (err, result) => result)
    return res
}

const getbyIds = async (ids) => {
    const res = await entrieModel.find({ _id: { $in: ids } }, (err, result) => result)
    return res
}

module.exports = { insert, getbyId, getbyIds }