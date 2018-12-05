module.exports = function(app) {
    app.get("/", (req, res) => {
        res.render('index')
    })
    app.get("/profile_page", (req, res) => {
        res.render('profile_page')
    })
    app.get("/question_create", (req, res) => {
        res.render('question_create')
    })
    app.get("/quiz-create", (req, res) => {
        res.render('quiz_create')
    })
    app.get("/results", (req, res) => {
        res.render('results')
    })

}