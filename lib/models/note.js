const Mongoose = require("mongoose");

let noteSchema = new Mongoose.Schema({
    title: String,
    subtitle: String,
    slug: String
});

module.exports = Mongoose.model('Note', noteSchema);