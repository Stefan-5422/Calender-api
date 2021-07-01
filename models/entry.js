const mongoose = require("mongoose")

class Entry {
    constructor(json) {
        if (json == null || undefined) throw "Required POST data missing"
        if ((json.name == null || undefined) ||
            (json.date == null || undefined) ||
            (json.duration == null || undefined)) throw "Required POST data missing"
        if (typeof json.date != "number") throw "Date is not a number"

        this.name = json.name
        this.description = json.description ?? undefined
        this.date = json.date
        this.duration = json.duration
    }
    serialize() {
        return {
            name: this.name,
            description: this.description,
            date: this.date,
            duration: this.duration,
        }
    }
}

const schema = new mongoose.Schema({
    name: String,
    description: String,
    date: String,
    duration: Number,
})

module.exports = Entry
module.exports.Schema = schema