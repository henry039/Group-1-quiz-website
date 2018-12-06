const auth = require('./authentication');

module.exports = function(app) {
    //get request for index page
    app.get("/", (req, res) => {
        res.render('index')
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
    })
    //get request for results page
    app.get("/results", (req, res) => {
        res.render('results')
    })

}