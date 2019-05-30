const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates the schema
const NoteSchema = new Schema({
    body: {
        type: String
    }
});

// Creates the model from schema
const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;