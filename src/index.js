const express = require('express');
const bodyParser = require('body-parser');
const route = require("./router/route")
const { default: mongoose } = require('mongoose');
const { Route } = require('express');
const app = express();


app.use(bodyParser.json());




mongoose.connect("mongodb+srv://stevewilson:stevewilson@cluster0.sawu4cc.mongodb.net/test", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(3000)
    console.log('Express app running on port ' + (3000))