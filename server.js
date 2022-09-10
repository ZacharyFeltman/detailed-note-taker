const express = require('express')
const path = require('path');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');

const server = express()
const PORT = 3001

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes)
    })
})

server.post('/api/notes', (req, res) => {
    var note = req.body
    note['id'] = uuidv4()
    fs.readFile('./db/db.json', 'utf8', function(err, data) {
        notes = [].concat(JSON.parse(data))
        notes.push(note)
        fs.writeFile('./db/db.json', JSON.stringify(notes), function(err,data) {
            res.json(note)
        })
    })
})

server.get('/notes', (req, res) => {
    res.sendFile(path.resolve('public/notes.html'));
  });
  
server.get('*', (req, res) => {
      res.sendFile(path.resolve('public/index.html'));
    });

server.listen(PORT)