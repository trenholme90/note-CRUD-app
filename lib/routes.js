"use strict";
const Path = require("path");
const Home = require("./controllers/home");
const Note = require("./controllers/note");

module.exports = [
    {
        method: "GET",
        path: "/",
        handler: Home,
        config: {
          description: "Gets all the notes available"
        }
    },
    {
        method: "POST",
        path: "/note",
        handler: Note.create,
        config: {
          description: "Creates new note",
          payload: {
            multipart: true,
          }
        }
    },
    {
        method: "GET",
        path: "/note/{slug}",
        handler: Note.read,
        config: {
          description: "Gets the content of a note"
        }
    },
    {
        method: "PUT",
        path: "/note/{slug}",
        handler: Note.update,
        config: {
          description: "Updates the selected note",
          payload: {
            multipart: true,
          }
        }
    },
    {
        method: "GET",
        path: "/note/{slug}/delete",
        handler: Note.delete,
        config: {
          description: "Deletes the selected note"
        }
    },
    {
        // Static files
        method: "GET",
        path: "/{param*}",
        handler: {
          directory: {
            path: Path.join(__dirname, "../static/public")
          }
        },
        config: {
          description: "Provides static resources"
        }
      }
];