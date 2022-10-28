const express = require('express');
const { MongoClient } = require('mongodb');

// express app
const app = express();

// mongodb connect
const dbURL = "mongodb+srv://root:oFJDV8fkof8aULMu@cluster0.xxgdtpu.mongodb.net/?retryWrites=true&w=majority";
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

    // 2nd middleware
    app.use((req,res,next) => {
        console.log('second middleware');
        next();
    })

    app.get('/', (req, res) => {
        res.sendFile('./views/index.html', {root: __dirname});
    })

    app.get('/about', (req, res) => {
        res.sendFile('./views/about.html', {root: __dirname});
    })

    // redirects
    app.get('/about-me', (req, res) => {
        res.redirect('/about');
    })

    app.get('/data', async (req, res) => {
        const user = await mongodb.collection("users").find().toArray();
        res.send(user);
        console.log("Users List: ", user);
    })

    // List of documents
    app.get('/userlist', async (req, res) => {
        const query = { username: "John"};
        const options = { sort: { name: -1}, projection: {_id: 0, username: 1, password: 1} };

        const user = await mongodb.collection("users").find(query, options).toArray();
        res.send(user);
    })

    // Specific document
    app.get('/user', async (req, res) => {
        const query = { username: "Test"};
        const options = { sort: { name: -1}, projection: {_id: 0, username: 1, password: 1} };

        const user = await mongodb.collection("users").findOne(query, options);
        res.send(user);
    })

    // Add document
    app.get('/useradd', async (req, res) => {
        var doc = {
            username: "Insert",
            password: "Test12345"
        }

        await mongodb.collection("users").insertOne(doc);
        res.status(200).send("Successfully inserted");
    })

    // Update document
    app.get('/userupdate', async (req, res) => {
        const filter = {username: "Insert"};

        await mongodb.collection("users").updateOne(filter, { $set: {password: "Test123456"} });
        res.status(200).send("Successfully updated");
    })

    // Delete document
    app.get('/userdelete', async (req, res) => {
        const filter = {username: "Insert"};

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
