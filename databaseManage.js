require('dotenv').config();

const knex = require('knex')({
    client:'postgresql',
    connection:{
        database: process.env.DATABASE,
        user:     process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
})



class Database{
    constructor(){}
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
                userId: userId,
                dateTime: trx.fn.now(3)
            }).returning('id');
            return {
                quizId: quizid,
                userId: userId
            };
        })
    }

    getQuizDetail(quizId,userId){
        return knex('quizzes').where('id', quizId).andWhere('userId', userId)
        .then(arr=>{
            return(arr[0]);
        })
    }

    getAllQuizzesDetail(userId){
        return knex('quizzes').where('userId', userId).orderBy('dateTime','asc')
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
            }).where('id',quizId).andWhere('userId',userId);
        })
    }

    deleteQuiz(quizId,userId){
        return knex.transaction(async trx=>{
                await trx('questions').where('quizId',quizId).andWhere('userId',userId).del();
                await trx('quizzes').where('id',quizId).andWhere('userId',userId).del();
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
            await trx('questions').insert({
                id: id,
                time: time,
                question: question,
                answers : JSON.stringify(answers),
                userId: userId,
                quizId: quizId
            });
        })
    }

    getQuestions(userId,quizId){
        return knex('questions').where('userId', userId ).andWhere('quizId', quizId) //return an array concataining question objects
    }

    editQuestion(question,answers,index,quizId,userId){ //must work after quiz is created
        return knex.transaction(async trx=>{
            if(question === undefined){
                throw new Error('question must be setted')
            }
            if(answers.length < 2){
                throw new Error('answer must be 2 or more')
            }
            let questionId = index + 1;
            await trx('questions').update({
                question: question,
                answers : JSON.stringify(answers)
            }).where('userId',userId).andWhere('quizId',quizId).andWhere('id',questionId);
        })
    }

    deleteQuestion(index,quizId,userId){
        return knex.transaction(async trx=>{
            let questionId = index+1;
            await trx('questions').where('quizId',quizId).andWhere('userId',userId).andWhere('id',questionId).del();
            await trx('questions').decrement('id',1).where('userId',userId).andWhere('quizId',quizId).andWhere('id','>',questionId);
        })
    }



    createRecord(players,quizId,userId){
        return knex.transaction(async trx =>{
            let [recordId] = await trx('records').insert({ //return a date object
                dateTime: trx.fn.now(3),
                userId: userId,
                quizId: quizId
            }).returning('id');

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
            });
        }
    }

    getRecord(recordId,userId){
        return knex('records').innerJoin('results','records.id','results.recordId')
        .where('id',recordId).andWhere('records.userId',userId);
    }

    deleteRecord(recordId,userId){
        return knex.transaction(async trx =>{
            await trx('results').where('recordId',recordId).andWhere('userId',userId).del();
            await trx('records').where('id',recordId).andWhere('userId',userId).del();
        })
    }

}


module.exports = Database;