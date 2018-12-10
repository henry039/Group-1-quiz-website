const express = require('express');
const hb = require('express-handlebars');
const router = require("./routers.js");
const parser = require('body-parser')

let app = express();

//setup template engine
let hbs = hb.create({
    defaultLayout: 'main',
    // layoutsDir : __dirname + '/xxxx',
    // partialDir :  __dirname + '/xxxx',
    helpers: {
        checkTIME: function (input, value) {
            return input === value.toString() ? 'selected = "selected"' : '';
        },
        checkCOR :  function (input) {
            return input ? 'active' : '';
        }
    }
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//static files
app.use(express.static('./public'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())
router(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');