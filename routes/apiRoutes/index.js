const router = require('express').Router();
const fs = require('fs');

router.get('/notes', (req, res) => {
    const note = getNote();
    res.send(note);
});

router.post('/notes', (req, res) => {
    const existNotes = getNote();
    const newNote = req.data;

    existNotes.push(newNote);
    saveNote(existNotes);
});

const saveNote = (data) => {
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync('db/db.json', stringifyData);
}

const getNote = () => {
    const noteData = fs.readFileSync('db/db.json');
    return JSON.parse(noteData);
}

module.exports = router;