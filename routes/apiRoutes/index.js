const router = require('express').Router();
const fs = require('fs');
const path = require('path')
const notes = require('../../db/db.json');
const notesArray = [];

// get notes so they can be displayed 
router.get('/notes', (req, res) => {
    res.json(notes)
});

// post notes and gives them an id number so they can be deleted if wanted
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = writeNewNote(req.body, notes);
    res.json(newNote);
});

// deletes a note if the user hit the trashcan icon
router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(true)
});

// function that is used to write to the db.json file to save note data
function writeNewNote(body, notesArray) {
    const note = body;

    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

// function that deletes items in the array according to their id
function deleteNote(id, notesArray) {

    notesArray.find((notes, index) => {
    
        if (notes.id == id) {
            notesArray.splice(index, 1);
            fs.writeFileSync(
                path.join(__dirname, '../../db/db.json'),
                JSON.stringify(notesArray)
            );
        }
    }) 
}

module.exports = router;