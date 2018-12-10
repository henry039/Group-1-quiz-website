<<<<<<< HEAD
const auth = require('./authentication');

=======
const data = require('./dummy_quiz.json')
>>>>>>> 93768c1bc3fc8fb2c95319c9a0b4928cf2ef9244
module.exports = function(app) {
    //get request for index page
    app.get("/", (req, res) => {
        res.render('index',{
            pageName : 'index'
        })
    })
    //post request for index page login.
    app.post("/", (req, res)=>{
        let authPost = new auth(req, res);
        if(req.body.hasOwnProperty('loginEmail') === true) {
            authPost.login();
        } else if (req.body.hasOwnProperty('email') === true) {
            authPost.signup();
        }
    })
    //get request for profile page
    app.get("/profile_page", (req, res) => {
        res.render('profile_page')
    })
<<<<<<< HEAD
    //get request for question create page
    app.get("/question_create", (req, res) => {
        res.render('question_create')
    })
    //post request for question create page
    app.post("/question_create", (req, res)=>{
        console.log(req.body)
    })
    //get request for quiz create page
    app.get("/quiz_create", (req, res) => {
        res.render('quiz_create')
=======
    app.get("/quiz_create", (req, res) => {
        res.render('quiz_create',{
            pageName : 'quiz_create'
        })
    })
    app.post("/quiz_create", (req, res) => {
        console.log((req.body))
    })
    app.get('/quiz_edit', (req,res)=>{
        res.render('quiz_edit',{
            pageName : 'quiz_edit',
            data : data
        })
    })
    app.post('/quiz_edit', (req, res)=>{
        console.log(req.body)
>>>>>>> 93768c1bc3fc8fb2c95319c9a0b4928cf2ef9244
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
<<<<<<< HEAD
    app.get("/game", (req, res) => {
        res.render('game')
    })
=======
    // app.get("/question_create", (req, res) => {
    //     res.render('question_create')
    // })
    // app.post("/question_create", (req, res)=>{
    //     console.log(req.body)
    // })
>>>>>>> 93768c1bc3fc8fb2c95319c9a0b4928cf2ef9244
}