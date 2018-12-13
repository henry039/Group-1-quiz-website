const express = require('express');
const hb = require('express-handlebars');
const router = require('./routers');
const parser = require('body-parser');
const session = require('express-session');
const socketIO = require('./socketIO');

//app setup
let app = express();
let server = app.listen(3000, function () {
    console.log("Listening on port 3000");
});

app.use(session({
    secret: 'superSecret',
    resave: true,
    saveUninitialized: false,
}))

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
app.use('/quiz_edit', express.static('public'));
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json())
router(app);

//socket and port setup
socketIO(server);