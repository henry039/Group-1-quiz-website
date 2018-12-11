const express = require('express');
const hb = require('express-handlebars');
const router = require("./routers.js");
const parser = require('body-parser');
const socket = require('socket.io');

//app setup
let app = express();
let server = app.listen(3000, function () {
    console.log("Listening on port 3000");
});

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

//socket and port setup
let io = socket(server);
let data = 0;
io.on('connection', function(socket) {
    console.log('made socket connection', socket.id);
    socket.on('next', function() {
        data = 0;
    })
    socket.on('chat', function() {
        data++;
        console.log(data);
        io.sockets.emit('chat', data);
    });
});