const Fs = require("fs");
const Path = require("path");
const Mongoose = require("mongoose");
const Settings = require("../../settings");
//const dbSettings = Settings[Settings.env].db;


const mongoose = Mongoose.connect(Settings.opts.url, Settings.opts.settings, (err) => {
    if(err) console.log(err);
    else console.log("connection successful");
});

const db = {};

Fs.readdirSync(__dirname)
    .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
    .forEach(file => {
        const model = sequelize.import(Path.join(__dirname, file));
        db[model.name] = model;
});

db.mongoose = mongoose;
//db.Sequelize = Sequelize;

module.exports = db;

// const Note = mongoose.model("note", {
//     title: String,
//     subtitle: String
// });

// return Note;
