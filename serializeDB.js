// const dbManager = new (require('./databaseManage.js'))

module.exports = function (input_data, userID = 1, quizID = 1) {
    if (input_data.method === 'create') {
        dbManager.createQuizStructure(input_data.quiz, userID, input_data.description);
        if (input_data.questions !== []) {
            dbManager.appendQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.time, quizID, userID);
        }
    } else if (input_data.method === 'update') {
        dbManager.editQuizDetail(input_data.quiz, input_data.description, quizID, userID)
        dbManager.editQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.index, quizID, userID)
    } else if (input_data.method === 'delete') {
        dbManager.deleteQuiz(quizID, userID)
        dbManager.deleteQuestion(input_data.questions.index, quizID, userID)
    } else {
        (async function () {
            const quiz = await dbManager.getQuizDetail(quizID, userID)
            const questions = await dbManager.getQuestions(userID, quizID)
            return {
                quiz : quiz,
                questions : questions
            }
        }())
    }
}
