const express = require('express')
const db = require('./db')
const app = express()
const port = 8080
const bodyParser = require("body-parser");
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
// GET
app.get('/users', async (req, res) => {
    try {
        const result = await db.pool.query("select * from users");
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// where get
app.get('/details', async (req, res) => {
    try {
        const result = await db.pool.query("select * from users where id=".req.body.id);
        res.json(result);
    } catch (err) {
        throw err;
    }
});

// login
app.get('/login', async (req, res) => {
    try {
        const result = await db.pool.query("select * from users where email= ?", [req.body.email]);
        res.json(result);
    } catch (err) {
        throw err;
    }
});
 
// POST
app.post('/user-add', async (req, res) => {
    let task = req.body;
    try {
        const result = await db.pool.query("INSERT INTO users value (name, email, password, role)", [task.name, task.email, task.password, task.role,]);
        res.json(result);
    } catch (err) {
        throw err;
    }
});
 
 
app.delete('/users', async (req, res) => {
    let id = req.query.id;
    try {
        const result = await db.pool.query("delete from users where id = ?", [id]);
        res.send(result);
    } catch (err) {
        throw err;
    } 
});
 
app.listen(port, () => console.log(`Listening on port ${port}`));