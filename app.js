const express = require('express');
const hb = require('express-handlebars');

let app = express();

//setup template engine
app.engine('handlebars' , hb({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static files
app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.render('index')
})


//listen to port
app.listen(3000);
console.log('You are listening to port 3000');