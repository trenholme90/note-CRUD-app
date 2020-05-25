"use strict";

const Hapi = require("@hapi/hapi");
const Path = require("path");
const Settings = require("./settings");
const DbConnect = require("./dbconnect");
const Routes = require("./lib/routes");

const init = async () => {
    const server = new Hapi.Server({ port: Settings.port });

    await server.register({
        plugin: require('hapi-mongodb'),
        options: Settings.opts
    });

    await DbConnect()

    await server.register([require("@hapi/vision"), require("@hapi/inert")]);

    server.views({
        engines: { pug: require("pug") },
        path: Path.join(__dirname, "lib/views"),
        compileOptions: {
            pretty: false
        },
        isCached: Settings.env === "production"
    });

    // Add routes
    await server.route(Routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();