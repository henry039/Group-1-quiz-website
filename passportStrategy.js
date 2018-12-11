const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('./bcrypt')
const knex = require('knex')({
    client:'postgresql',
    connection:{
        database: process.env.DATABASE,
        user:     process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
});
require('dotenv').config();


const brcypt = require('./bcrypt');

module.exports = (app)=>{
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('local-login',new LocalStrategy({
        usernameField: 'email' //declare name of the target
    },
        async (email,password,done) => {
            try{
                let users = await knex('users').where('email',email);
               if(users.length === 0){ //if there is no such username
                    return done(null,false,{message: 'invalid credentials'});
                }else{
                    let user = users[0];
                    let result = await brcypt.checkPassword(password,user.password)
                    if(result){ //if the password is matched
                        return done(null,user);
                    }else{
                        return done(null,false,{message: 'invalid credentials'});
                    }
                } 
            }catch(err){
                return done(err);
            }
        }
    ))

    passport.use('local-signin', new LocalStrategy({
            usernameField: 'user'
        },
        async (user,password,done) => {
            try{
                let hashPassword = bcrypt.hashPassword(password);
                let users = await knex('users').where({
                    email: user.email
               });
               if(users.length === 0){ //if there is no such username
                    let [userId] = await knex('users').insert({
                        username: user.name,
                        email: user.email,
                        password: hashPassword
                    }).returning('id')

                    user = await knex('users').where({id:userId})

                    return done(null,user)

                }else{
                    return done(null,false,{message: 'email alreay exsit'});
                }   
            }catch(err){
                return done(err);
            }
        }
    ))

    passport.serializeUser((user,done)=>{
        return done(null,user.id)
    })

    passport.deserializeUser(async(id,done)=>{ //sign in using user's id
        let users = await knex('users').where({id:id});
        if(users.length === 0){
            return done(new Error(`Wrong user id ${id}`));
        }else{
            let user = uesrs[0];
            return done(null,user);
        }
    })
}