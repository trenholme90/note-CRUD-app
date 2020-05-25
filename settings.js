require("dotenv").config({ silent: true });

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || "development",
    opts: {
        url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-aiafw.mongodb.net/notes?retryWrites=true&w=majority`,       
        settings: {
            useUnifiedTopology: true,
            useNewUrlParser: true
        },
        decorate: true    
    }
};