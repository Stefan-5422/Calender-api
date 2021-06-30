const formatEntry = (json) => {
    console.log("a")
    let json2 = {
        name: json.name,
        description: json.description,
        date: json.date,
        duration: json.duration,
        id: json._id
    }
    return json2
}

module.exports = { formatEntry }