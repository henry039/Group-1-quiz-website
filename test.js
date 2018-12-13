const dbManager = new (require('./databaseManage.js'))
let quizID = 2;
let userID = 1;
let quiz;
let question;

// dbManager.getQuizDetail(quizID, userID).then(data =>quiz = data)
// setTimeout(() => {
//     console.log(quiz)
// }, 500);
// dbManager.deleteQuestion(0, quizID, userID)
// dbManager.getQuestions(userID, quizID).then(data => console.log(data[2].answers[0]))

dbManager.getQuizDetail(quizID, userID).then(data =>quiz = data)
dbManager.getQuestions(userID, quizID).then(data => question = data)
setTimeout(() => {
    console.log(quiz, question)
}, 500);