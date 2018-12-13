const data = require('./dummy_quiz.json');
const passport = require('passport');
const setUpPassportStrategy = require('./passportStrategy')
const auth = require('./authentication');
const dbConnect = require('./serializeDB.js')
const fs = require('fs');
const Database = require('./databaseManage');

const db = new Database();

let dummyDataJSON = fs.readFileSync('./dummy_quiz.json');
let parsedDummyDataJSON = JSON.parse(dummyDataJSON);

module.exports = function(app) {

    setUpPassportStrategy(app);

    function checkAuthentication(req,res,next){
        if(!req.isAuthenticated()){
            console.log('not authenticated')
            res.redirect('/');    
        }else{
            next();
        }
    }

    //get request for index page
    app.get("/", (req, res) => {
        let user = req.user;
        if(user){
            res.render('index',{
                username: user.username,
                pageName : 'index'
            })
        }else{
            res.render('index',{
                pageName : 'index'
            })
        }
        
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
        res.send({
            redirect: true,
            redirectURL: '/profile_page'
        });
    })

    app.post('/signup',passport.authenticate('local-signup'),(req,res) => {
        res.send({
            redirect: true,
            redirectURL: '/profile_page'
        });
    })

    //get request for profile page
    app.get("/profile_page", checkAuthentication, async (req, res) => {
        let user = req.user;
        let quizList = await db.getAllQuizzesDetail(user.id);
        for(let i in quizList){
            quizList[i].id = Number(i)+1;
            let dateTime = quizList[i].dateTime;
            quizList[i].dateTime = `${dateTime.getFullYear()}-${dateTime.getMonth()}-${dateTime.getDate()}`
        }
        res.render('profile_page',{
            pageName:'profile_page',
            username: user.username,
            email: user.email,
            quizzes: quizList
        })
    })
    app.get("/quiz_create", (req, res) => {
        res.render('quiz_create',{
            username: req.uesr.username,
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
            username: req.uesr.username,
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
            username: req.uesr.username,
            pageName : 'results'
        })
    })
    app.get('/ready', (req,res)=>{
        res.render('ready_page')
    })
    
    app.get("/game", (req, res) => {
        res.render('game', {
            username: req.uesr.username,
            pageName : 'game'
        })
    })
    app.post("/game", (req, res) => {
        res.json(parsedDummyDataJSON);
    })
}