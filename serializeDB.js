const dbManager = new (require('./databaseManage.js'))
module.exports = function (input_data, userID = 1) {
    if (input_data.method === 'create') {
        dbManager.createQuizStructure(input_data.quiz, userID, input_data.description);
        if (input_data.questions !== []) {
            dbManager.appendQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.time, input_data.quiz, userID);
        }
    } else if (input_data.method === 'update') {
        if(input_data.type === 'quiz'){
            // console.log('update quiz '+input_data.type)
            dbManager.editQuizDetail(input_data.quiz, input_data.description, quizID, userID)
        }else if(input_data.type === 'question'){
            if(input_data.action === 'append'){
                // console.log('append question '+input_data)
                dbManager.appendQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.time, input_data.questions.quizID, userID)
            }else if (input_data.action === 'edit'){
                // console.log('edit question ' + input_data)
                dbManager.editQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.index, input_data.questions.quizID, userID)
            }
        }
    } else if (input_data.method === 'delete') {
        if(input_data.type === 'quiz'){
            // dbManager.deleteQuiz(quizID, userID)
        }else if(input_data.type === 'question'){
            // console.log('delete question '+input_data.index)
            dbManager.deleteQuestion(input_data.index, quizID, userID)
        }
    } else if(input_data.method === 'get'){
        //     return {
        //         quiz : quiz,
        //         questions : questions
        //     }
        let quizID = 2;
        let userID = 1;
        let quiz;
        let question;
        dbManager.getQuizDetail(quizID, userID).then(data =>quiz = data)
        dbManager.getQuestions(userID, quizID).then(data => question = data)
        setTimeout(() => {
            return {
                quiz : quiz,
                questions : question
            }
        }, 500);
    }
}
