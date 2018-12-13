const dbManager = new (require('./databaseManage.js'))
module.exports = function (input_data, userID) {
    if (input_data.method === 'create') {
        dbManager.createQuizStructure(input_data.quiz, userID, input_data.description);
    } else if (input_data.method === 'update') {
        if(input_data.type === 'quiz'){
            // console.log('update quiz '+input_data.type)
            dbManager.editQuizDetail(input_data.quiz, input_data.description, input_data.quizID, userID)
        }else if(input_data.type === 'question'){
            if(input_data.action === 'append'){
                // console.log('append question '+input_data)
                dbManager.appendQuestion(input_data.question, input_data.answers, input_data.time, input_data.quizID, userID)
            }else if (input_data.action === 'edit'){
                // console.log('edit question ' + input_data)
                dbManager.editQuestion(input_data.question, input_data.answers, input_data.index, input_data.quizID, userID)
            }
        }
    } else if (input_data.method === 'delete') {
        if(input_data.type === 'quiz'){
            dbManager.deleteQuiz(input_data.quizID, userID)
        }else if(input_data.type === 'question'){
            // console.log('delete question '+input_data.index)
            dbManager.deleteQuestion(input_data.index, input_data.quizID, userID)
        }
    } else if(input_data.method === 'get'){
        return dbManager.getQuizDetail(input_data.quizId, userID).then(quiz =>{
            return dbManager.getQuestions(userID,input_data.quizId).then(question =>{
                return {
                    quiz : quiz,
                    questions : question
                }
            })
        }).catch(err =>{console.log(err)})
    }
}
