const { error } = require('console');
const express = require('express');
const router = express.Router();

const path = require('path');
const filePatth = path.join(__dirname,'..','data','contacts.db');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/contacts.db');

db.run(`CREATE TABLE IF NOT EXISTS contact(
    id INTEGER PRIMARY KEY, 
    fname TEXT,
    lname TEXT,
    email TEXT,
    subject TEXT,
    message DATE,
    submittedAt DATE)`)

router.post('/', (req, res) => {
    const{fname, lname, email, subject, message} = req.body

    db.run(`INSERT INTO contact 
        (fname, lname, email, subject, message, submittedAt) 
        VALUES (?, ?, ?, ?, ?, ?)`,[fname, lname, email, subject, message, new Date()])

    console.log('Content form submitted', {fname, lname, email, subject, message});
    res.status(200).json({status:"Message Recieved"});
});

router.get('/:action', (req, res) => {
    const { action } = req.params;

    switch(action){
        case 'all':
            var sql = 'SELECT * FROM contact ORDER BY submittedAt DESC'
            db.all(sql, [], (error, rows) => {
                if(error){
                    return res.status(500).json({error:'Fail to fetch contact from DB!!'});
                }
                res.json(rows);
            })
        break;
        case 'last':
            var sql = 'SELECT * FROM contact ORDER BY submittedAt DESC LIMIT 1'
            var sql = 'SELECT * FROM contact WHERW submittedAt = (SELECT max(submittedAt) FROM contact'
            db.all(sql, [], (error, rows) => {
                if(error){
                    return res.status(500).json({error:'Fail to fetch contact from DB!!'});
                }
                res.json(rows);
            })
        break;
        case 'deleteLast':
            var sql = 'DELETE FROM contact WHERE id = (SELECT max(id) FROM contact)'
            db.all(sql, [], (error, rows) => {
                if(error){
                    return res.status(500).json({error:'Fail to fetch contact from DB!!'});
                }
                res.json({message : 'last contact is deleted!!'});
            })
        break;
        default:
            res.status(404).json({error:'action not faond!!'});
    }

})

module.exports = router;