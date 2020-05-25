"use strict";

const Note = require("../models/note");
const Slugify = require("slug");
const Path = require("path");
const Pug = require("pug");

module.exports = {
    create: async (request, h) => {
        const note = new Note({
            title: request.payload.noteTitle,
            subtitle: request.payload.subtitle,
            slug: Slugify(request.payload.noteTitle, { lower: true })
        });

        const result = await note.save()
            .then(doc => {    
                return Pug.renderFile(
                    Path.join(__dirname, "../views/components/note.pug"),
                    {
                        note: doc
                    }
                );
            })
            .catch(err => {
                console.error(err)
                return err
            })

        return result
    },
    read: async (request, h) => {

        try {
            const db = request.mongo.db;
            const note = await db.collection('notes').findOne({
                //replace with slug ID
                //_id: ObjectId("5ec43aaea2f19f1d80ab1dc3")
                slug: request.params.slug
            });

            return h.view("note", {
                note,
                page: `${note.title} — Notes Board`,
                subtitle: note.subtitle,
                slug: note.slug
            });
        }
        catch (err) {
            console.log(err)
        }
    },
    update: async (request, h) => {
        try {
            const db = request.mongo.db;
            const values = {
                title: request.payload.noteTitle,
                subtitle: request.payload.subtitle,
                slug: Slugify(request.payload.noteTitle, { lower: true })
            };
    
            const result = await db.collection('notes').findOneAndReplace(
                { slug: request.params.slug },
                { 
                    title: values.title, 
                    subtitle: values.subtitle,
                    slug: values.slug
                },
                { returnOriginal : false }
                  
            );
            console.log(result.value)
            // Generate a new note with the updated data
            return Pug.renderFile(
                Path.join(__dirname, "../views/components/note.pug"),
                {
                note: result.value
                }
            );
        }
        catch (err) {
            console.log(err)
        }        
    },
    delete: async (request, h) => {
        try {
            const db = request.mongo.db;
            db.collection('notes').findOneAndDelete(
                { slug: request.params.slug}
            );
        
            return h.redirect("/");
        }
        catch (err) {
            console.log(err)
        } 
    }
};