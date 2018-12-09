module.exports = function(app) {
    app.get("/", (req, res) => {
        res.render('index',{
            pageName : 'index'
        })
    })
    app.post("/", (req, res)=>{
        console.log(req.body)
    })
    app.get("/profile_page", (req, res) => {
        res.render('profile_page')
    })
    app.get("/quiz_create", (req, res) => {
        res.render('quiz_create',{
            pageName : 'quiz_create'
        })
    })
    app.post("/quiz_create", (req, res) => {
        console.log(JSON.stringify(req.body))
    })
    app.get("/results", (req, res) => {
        res.render('results',{
            pageName : 'results'
        })
    })
    app.get('/ready', (req,res)=>{
        res.render('ready_page')
    })
    // app.get("/question_create", (req, res) => {
    //     res.render('question_create')
    // })
    // app.post("/question_create", (req, res)=>{
    //     console.log(req.body)
    // })
}