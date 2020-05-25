const Mongoose = require("mongoose");
const Settings = require("./settings");

module.exports = async () => {
    const dbInstance = await Mongoose.connect(Settings.opts.url, Settings.opts.settings, (err) => {
        if(err) return console.log(err);
        else return console.log("connection successful");
    });
    
    return dbInstance;
};