const express = require('express');
const hb = require('express-handlebars');
const router = require("./routers.js");
const parser = require('body-parser');

let app = express();

//setup template engine
app.engine('handlebars' , hb({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static files
app.use(express.static('./public'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())
router(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');