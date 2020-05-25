"use strict";

module.exports = async (request, h) => {
    const db = request.mongo.db;

    try {
        const result = await db.collection('notes').find().toArray();
        return h.view('home', {
            data: {
                notes: result
            },
            page: 'Home — Notes Board',
            description: 'Welcome to my Notes Board'
          });
    }
    catch (err) {
        console.log(err)
    }
};