const router = require('express').Router();
const fs = require('fs');
const path = require('path')
const notes = require('../../db/db.json');
const notesArray = [];

router.get('/notes', (req, res) => {
    res.json(notes)
});

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const newNote = writeNewNote(req.body, notes);
    res.json(newNote);
});

router.delete('/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(true)
});

router.patch('/notes/:id', (req, res) => {

});

function writeNewNote(body, notesArray) {
    const note = body;

    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return note;
}

function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        const notes = notesArray[i];

        if (notes.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../../db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );
        }
    }
}

module.exports = router;