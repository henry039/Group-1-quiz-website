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
    async createQuizStructure(topic,userId,description){  //create quiz and append quiz link to quiz list
        try {
            await knex.transaction(async (trx) => {
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
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    async getQuizDetail(quizId,userId){
        const arr = await knex('quizzes').where('id', quizId).andWhere('userId', userId);
        console.log(arr);
    }

    async editQuizDetail(topic,description,quizId,userId){ 
        try{
            await knex.transaction(async trx=>{
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
        }
        catch(err) {
            console.log(err)
        }
       
        let arr = await knex('quizzes').where('id',quizId).andWhere('userId',userId);
        console.log(arr)
    }

    async appendQuestion(question,answers,userId,quizId){
        
    }
    editQuestion(){}
    deleteQuestion(){}
    createResult(){}
    deleteResult(){}
}

let db = new database();

db.editQuizDetail('no','great',1,1);

// module.exports = database;