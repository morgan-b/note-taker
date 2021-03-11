const express = require("express");
const fs = require("fs");
const path = require('path');

// Use Port 3000
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")))

// set /notes to display the notes.html page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// set / to display the index.html page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// get the content of the notes and desplay back to client
app.get('/api/notes', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8');
  allNotes = JSON.parse(allNotes);
  res.json(allNotes)
});

// add a new note to db.json and add an id to the note
app.post('/api/notes', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8');
  allNotes = JSON.parse(allNotes);
  req.body.id = allNotes.length;
  allNotes.push(req.body);
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(allNotes),'utf8');
  res.json(allNotes)
});

// delete a  note from db.json based on id
app.delete('/api/notes/:id', (req, res) => {
  let allNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), 'utf8');
  allNotes = JSON.parse(allNotes);
  allNotes = allNotes.filter(function(note) {
    return note.id != req.params.id;
  });
  fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(allNotes),'utf8');

  res.json(allNotes);

 })

 // if a user goes to a page that isnt defined - send them to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => console.log("listening"))