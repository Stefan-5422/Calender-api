const mongoose = require("mongoose")

class Entry {
    constructor(json) {
        if ((json.name == null || undefined) ||
            (json.date == null || undefined)) throw "no";
        this.name = json.name
        this.description = json.description ?? undefined
        this.date = json.date
    }
    serialize() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,
        }
    }
}

const schema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
})

module.exports = Entry
module.exports.Schema = schema