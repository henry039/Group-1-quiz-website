const data = require('./dummy_quiz.json');
const passport = require('passport');
const setUpPassportStrategy = require('./passportStrategy')
const auth = require('./authentication');
const dbConnect = require('./serializeDB.js')
// const fs = require('fs');

// let dummyDataJSON = fs.readFileSync('./dummy_quiz.json');
// let parsedDummyDataJSON = JSON.parse(dummyDataJSON);

module.exports = function(app) {

    setUpPassportStrategy(app);

    //get request for index page
    app.get("/", (req, res) => {
        res.render('index',{
            pageName : 'index'
        })
    })
    //post request for index page login.
    // app.post("/", (req, res)=>{
    //     let authPost = new auth(req, res);
    //     if(req.body.hasOwnProperty('loginEmail') === true) {
    //         authPost.login();
    //     } else if (req.body.hasOwnProperty('email') === true) {
    //         authPost.signup();
    //     }
    // })

    app.post('/login', passport.authenticate('local-login'),(req,res) => {
        console.log(req.user);
    })

    app.post ('/signup',passport.authenticate('local-signup'),(req,res) => {
        console.log(req.user);
    })

    //get request for profile page
    app.get("/profile_page", (req, res) => {
        res.render('profile_page')
    })
    app.get("/quiz_create", (req, res) => {
        res.render('quiz_create',{
            pageName : 'quiz_create'
        })
    })
    app.post("/quiz_create", (req, res) => {
        // dbConnect(req.body)
    })
    app.get('/api/quiz_edit', (req,res)=>{
        res.send(dbConnect({method : 'get'}))
    })
    app.get('/quiz_edit', (req,res)=>{
        res.render('quiz_edit',{
            pageName : 'quiz_edit',
            data : dbConnect({method : 'get'})
        })
    })
    app.post('/quiz_edit', (req, res)=>{
        // console.log(req.body)
        dbConnect(req.body)
    })
    //get request for results page
    app.get("/results", (req, res) => {
        res.render('results',{
            pageName : 'results'
        })
    })
    app.get('/ready', (req,res)=>{
        res.render('ready_page')
    })
    
    app.get("/game", (req, res) => {
        res.render('game', {
            pageName : 'game'
        })
    })
}