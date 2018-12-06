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
        return knex.transaction(async (trx) => {
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
        return knex.transaction(async trx=>{
            if(topic === undefined){
                return new Error("topic can't be empty");
            }
            if(description == undefined){
                description = '';
            }
            await trx('quizzes').update({
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

    appendQuestion(question,answers,userId,quizId){
        return knex.transaction(async trx=>{
            
        })
    }
    editQuestion(){}
    deleteQuestion(){}
    createResult(){}
    deleteResult(){}
}

let db = new database();
db.deleteQuiz(3,1);

// module.exports = database;