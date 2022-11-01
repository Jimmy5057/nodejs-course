const express = require('express');
const { MongoClient } = require('mongodb');

// express app
const app = express();

// mongodb connect
const dbURL = "mongodb+srv://root:oFJDV8fkof8aULMu@cluster0.gz8s2cm.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(dbURL);
var mongodb;

initializeApp();

async function connect() {
    await mongoClient.connect();
    console.log("Connected to MongoDB");

    // Specify the database
    mongodb = mongoClient.db("node-course");

}

async function initializeApp() {
    // connect mongodb
    await connect();

    // listen for requests
    app.listen(80);

    // middleware for assets
    app.use(express.static('assets'));

    // middleware for logging
    app.use((req,res,next) => {
        console.log('new request made:');
        console.log('host:', req.hostname);
        console.log('path:', req.path);
        console.log('method:', req.method);
        next();
    })

    // middleware for http request
    app.use(express.urlencoded({extended: true}));

    app.get('/', (req, res) => {
        res.sendFile('./views/index.html', {root: __dirname});
    })

    app.get('/about', (req, res) => {
        res.sendFile('./views/about.html', {root: __dirname});
    })

    app.get('/users', (req, res) => {
        res.sendFile('./views/user.html', {root: __dirname});
    })

    // redirects
    app.get('/about-me', (req, res) => {
        res.redirect('/about');
    })

    // Get user list
    app.get('/api/user', async (req, res) => {
        const user = await mongodb.collection("users").find().toArray();
        res.status(200).send(user);
    })

    // Add User
    app.post('/api/user', async (req, res) => {
        var doc = req.body;

        await mongodb.collection("users").insertOne(doc);
        res.status(200).send("Successfully Inserted.");
    })

    // Route params
    app.get('/api/user/:username', async (req, res) => {
        var username = req.params.username;
        res.status(200).send(username);
    })

    // Update User
    app.put('/api/user/:username', async (req, res) => {
        const filter = {username: req.params.username};
        var doc = req.body;

        await mongodb.collection("users").updateOne(filter, { $set: doc });
        res.status(200).send("Successfully updated");
    })

    // Delete user
    app.delete('/api/user/:username', async (req, res) => {
        const filter = {username: req.params.username};

        const result = await mongodb.collection("users").deleteOne(filter);
        
        if (result.deletedCount === 1) {
            res.status(200).send("Successfully deleted");
        } else {
            res.status(400).send("No documents found.");
        }
    })

    app.use((req, res) => {
        res.status(404).sendFile('./views/404.html', {root: __dirname});
    })
}
