const dbManager = new (require('./databaseManage.js'))
const db = require('./serializeDB.js')

// dbManager.getQuizDetail(quizID, userID).then(data =>quiz = data)
// setTimeout(() => {
//     console.log(quiz)
// }, 500);
// dbManager.deleteQuestion(0, quizID, userID)
// dbManager.getQuestions(userID, quizID).then(data => console.log(data[2].answers[0]))

// dbManager.appendQuestion('DO you look good ?', [{"answer":"No","correct":false},{"answer":"Yes","correct":true}], '10', quizID, userID);

db({method: 'get', quizId : 2}, 3).then(data => console.log(data))