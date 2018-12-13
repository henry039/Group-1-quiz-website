const passport = require('passport');
const setUpPassportStrategy = require('./passportStrategy')
const auth = require('./authentication');
const dbConnect = require('./serializeDB.js')
const Database = require('./databaseManage');

const db = new Database();

module.exports = function(app) {

    setUpPassportStrategy(app);

    function checkAuthentication(req,res,next){
        if(!req.isAuthenticated()){
            console.log('not authenticated')
            res.redirect('/');
            next('route')    
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
            quizList[i].index =  Number(i)+1;
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
    app.get("/quiz_create", checkAuthentication, (req, res) => {
        res.render('quiz_create',{
            username: req.user.username,
            pageName : 'quiz_create'
        })
    })
    app.post("/quiz_create", (req, res) => {
        dbConnect(req.body, req.user.id)
    })

    app.get('/api/quiz_edit', checkAuthentication, (req,res)=>{
        dbConnect({method : 'get'}, req.user.id).then(data =>{
            res.send(data)
        })
    })


    app.get('/quiz_edit/:index', checkAuthentication, async (req,res)=>{
        let index = req.params.index;
        let quizList = await db.getAllQuizzesDetail(req.user.id);
        let quizId = quizList[index-1].id;
        res.render('quiz_edit',{
            username: req.user.username,
            pageName : 'quiz_edit',
            data : dbConnect({
                method : 'get',
                quizId: quizId
            }, req.user.id)
        })
    })
    app.post('/quiz_edit', checkAuthentication,(req, res)=>{
        // console.log(req.body)
        dbConnect(req.body, req.user.id)
    })

    //get request for results page
    app.get("/results", (req, res) => {
        res.render('results',{
            username: req.user.username,
            pageName : 'results'
        })
    })
    app.get('/ready', (req,res)=>{
        res.render('ready_page')
    })
    
    app.get("/game", (req, res) => {
        res.render('game', {
            // username: req.user.username,
            pageName : 'game'
        })
    })
}