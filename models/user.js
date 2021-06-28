const mongoose = require("mongoose")

class User {
    constructor(json) {
        if (json == undefined) throw "no"
        if ((json.username == (null || undefined)) ||
            (json.password == (null || undefined))) throw "no"

        this.username = json.username
        this.password = json.password
        this.entries = (json.entries != null || undefined) ? json.entries : undefined
        this.id = (json._id != null || undefined) ? json._id : undefined
        this.settings = (json.settings != null || undefined) ? json.settings : undefined
    }
    serialize() {
        return {
            username: this.username,
            password: this.password,
            entries: this.entries,
            _id: this.id,
            settings: this.settings,
        }
    }
}

const schema = new mongoose.Schema({
    username: String,
    password: String,
    entries: Array,
    profilepicture: String,
    settings: JSON,
})

module.exports = User
module.exports.Schema = schema