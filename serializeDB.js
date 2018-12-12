// const dbManager = new (require('./databaseManage.js'))

module.exports = function (input_data, userID = 1, quizID = 1) {
    if (input_data.method === 'create') {
        // dbManager.createQuizStructure(input_data.quiz, userID, input_data.description);
        if (input_data.questions !== []) {
            // dbManager.appendQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.time, quizID, userID);
        }
    } else if (input_data.method === 'update') {
        if(input_data.type === 'quiz'){
            // dbManager.editQuizDetail(input_data.quiz, input_data.description, quizID, userID)
            console.log('update quiz '+input_data.type)
        }else if(input_data.type === 'question'){
            if(input_data.action === 'append'){
                console.log('append question '+input_data)
            }else if (input_data.action === 'edit'){
                console.log('edit question ' + input_data)
            }
            // dbManager.editQuestion(input_data.questions.question, input_data.questions.answers, input_data.questions.index, quizID, userID)
        }
    } else if (input_data.method === 'delete') {
        if(input_data.type === 'quiz'){
            // dbManager.deleteQuiz(quizID, userID)
        }else if(input_data.type === 'question'){
            console.log('delete question '+input_data.index)
            // dbManager.deleteQuestion(input_data.index, quizID, userID)
        }
    } else {
        // (async function () {
        //     const quiz = await dbManager.getQuizDetail(quizID, userID)
        //     const questions = await dbManager.getQuestions(userID, quizID)
        //     return {
        //         quiz : quiz,
        //         questions : questions
        //     }
        // }())
        return {
            quiz : {
                id : 2,
                name : 'easy',
                description : 'easy'
            },
            questions : [{
                question : 'now',
                time : "25",
                answers : [
                    {answer : 'No'},
                    {answer : 'Yes'}
                ]
            }]
        }
    }
}
