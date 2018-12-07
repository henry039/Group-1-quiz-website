require('dotenv').config();

const knex = require('knex')({
    client:'postgresql',
    connection:{
        database: process.env.DATABASE,
        user:     process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
})



class database{
    constructor(){}
    localSignIn(){}
    logIn(){}
    logOut(){}
    createQuizStructure(topic,userId,description){  //create quiz and append quiz link to quiz list
        return knex.transaction(async trx=>{
            if (topic === undefined) {
                return new Error("topic can't be empty");
            }
            if (description == undefined) {
                description = '';
            }
            let [quizid] = await trx('quizzes').insert({
                topic: topic,
                description: description,
                userId: userId
            }).returning('id');
            return {
                quizId: quizid,
                userId: userId
            };
        })
        .catch(err => {
            console.log(err);
        })
    }

    getQuizDetail(quizId,userId){
        return knex('quizzes').where('id', quizId).andWhere('userId', userId)
        .then(arr=>{
            console.log(arr[0]);
            return(arr[0]);
        });
    }

    editQuizDetail(topic,description,quizId,userId){ 
        return knex.transaction(trx=>{
            if(topic === undefined){
                return new Error("topic can't be empty");
            }
            if(description == undefined){
                description = '';
            }
            trx('quizzes').update({
                topic: topic,
                description: description
            }).where('id',quizId).andWhere('userId',userId)
        })
        .catch(err => {
            console.log(err)
        })
    }

    deleteQuiz(quizId,userId){
        return knex.transaction(async trx=>{
                await trx('questions').where('quizId',quizId).andWhere('userId',userId).del();
                await trx('quizzes').where('id',quizId).andWhere('userId',userId).del()
            })
        .catch(err =>{
            console.log(err);
        })
    }

    appendQuestion(question,answers,time,quizId,userId){ //must work after quiz is created
        return knex.transaction(async trx=>{
            let questionsAdded = await trx('questions').where('userId',userId).andWhere('quizId',quizId);
            let id;
            if (questionsAdded.length > 0){
                id = questionsAdded.length+1;
            }else{
                id = 1
            }

            trx('questions').insert({
                id: id,
                time: time,
                question: question,
                answers : JSON.stringify(answers),
                userId: userId,
                quizId: quizId
            })
        })
        .catch(err =>{
            console.log(err);
        })
    }

    getQuestions(userId,quizId){
        return knex('questions').where('userId', userId ).andWhere('quizId', quizId) //return an array concataining question objects
        .catch(err =>{
            console.log(err);
        })
    }

    editQuestion(question,answers,questionId,quizId,userId){ //must work after quiz is created
        return knex.transaction(trx=>{
            if(question === undefined){
                throw new Error('question must be setted')
            }
            if(answers.length < 2){
                throw new Error('answer must be 2 or more')
            }
            trx('questions').update({
                question: question,
                answers : JSON.stringify(answers)
            }).where('userId',userId).andWhere('quizId',quizId).andWhere('id',questionId)
        })
        .catch(err =>{
            console.log(err);
        })
    }

    deleteQuestion(questionId,quizId,userId){
        return knex.transaction(trx=>{
            trx('questions').where('quizId',quizId).andWhere('userId',userId).andWhere('id',questionId).del();
        })
        .catch(err =>{
            console.log(err);
        }) 
    }



    createRecord(players,quizId,userId){
        return knex.transaction(async trx =>{
            let [recordId] = await trx('records').insert({ //return a date object
                dateTime: trx.fn.now(3),
                userId: userId,
                quizId: quizId
            }).returning('id')

            await this.appendResults(players,recordId,userId,trx)
        })
    }
     
    async appendResults(players,recordId,userId,trx){
        for(let player of players){
            await trx('results').insert({
                playerName: player.name,
                questionId: player.questionId,
                answer: JSON.stringify(player.answer),
                userId: userId,
                recordId: recordId
            })
        }
    }

    getRecord(recordId,userId){
        return knex.transaction(trx=>{
            
        })
    }
    deleteRecord(){}
}


let db = new database();
let players = [
    {
        name:'james',
        questionId: 1,
        answer: {answer: 'yes', correct: false}
    },
    {
        name:'kat',
        questionId: 1,
        answer: {answer: 'no', correct: true}
    }
]
db.createRecord(players,1,1);

// module.exports = database;