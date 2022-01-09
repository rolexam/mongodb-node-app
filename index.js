const express = require('express')
const { init } = require('./db')
const router = require("./routes");
const path = require("path");
const bodyParser = require('body-parser')

const app = express()
app.use(express.json());
app.use(express.urlencoded());
app.use(router)

app.set('view engine', 'ejs');

init().then(() => {
    console.log('starting server on port 3000')
    app.listen(3000)
})