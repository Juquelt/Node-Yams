// routing on server side.
const express = require("express");

// Creating express object
const app = express();

// Require path module
const path = require('path');

// Require pug template
const pug = require("pug");

// Require router
const router = require('./appRouter')

// Require mongoose to use mongoDb
const mongoose = require("mongoose");
const port = 3000;

// Make a static route to use your
// static files in client side
app.use('/static', express.static('static/'));

// Middleware for parsing
app.use(express.urlencoded());

app.use(router);

// Define and use pug engine so also
// declare path on rendering
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

async function dbConnect() {
    try {
// Database Connection
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/yams",
            {useUnifiedTopology: true}
        );
        console.log('Connexion MongoDB établie!')
    } catch (err) {
        console.log('Erreur de connexion à MongoDB', err);
        process.exit(0);
    }
}

dbConnect().then(() =>{
    app.listen(port, () => {
        console.log("server is running");
    });
})
// Server setup

