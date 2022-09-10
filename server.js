const express = require('express')
const path = require('path');
const fs = require('fs');

const server = express()
const PORT = 3001

server.use(express.static('public'))
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8').then(function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        notes = [].concat(JSON.parse(data))
        res.json(notes)
    })
})

server.get('/notes', (req, res) => {
    res.sendFile(path.resolve('public/notes.html'));
  });
  
server.get('*', (req, res) => {
      res.sendFile(path.resolve('public/index.html'));
    });

server.listen(PORT)