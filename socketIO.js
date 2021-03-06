const socket = require('socket.io');
const db = require('./serializeDB.js')

module.exports = function (server) {
    // configs
    let io = socket(server);

    db({ method: 'get', quizId: 1 }, 1).then(data => {
        let questions = data.questions

        function shuffleOptions(answerArray) {
            if (answerArray !== []) {
                for (let i = answerArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [answerArray[i], answerArray[j]] = [answerArray[j], answerArray[i]];
                }
                return answerArray;
            }
        }

        function check_answer(submitted_answer) {
            return question_set_for_checking[(counter_current_questions)][submitted_answer]
        }

        function redefine_options_set() {
            let output = [];
            let questions_array = questions;
            for (let i = 0; i < questions_array.length; i++) {
                let temp = {};
                for (let j = 0; j < questions_array[i].answers.length; j++) {
                    temp[questions_array[i].answers[j].answer] = questions_array[i].answers[j].correct
                }
                output.push(temp)
            }
            return output
        }

        function render_questionLoop() {
            let arr = [];
            for (let i = 0; i < questions.length; i++) {
                let currentQuestion = questions[i].question;
                let outputObj = {
                    Question: currentQuestion,
                    Answers: []
                }
                arr.push(outputObj);
                for (let j = 0; j < (questions[i].answers).length; j++) {
                    outputObj.Answers.push(questions[i].answers[j].answer);
                }
            }
            for (let i = 0; i < arr.length; i++) {
                shuffleOptions(arr[i].Answers)
            }
            return arr;
        }



        // temp storage section
        let contender = [
            // prevent repeat here
            // {'handleName' : 'socket.id'}
        ];
        let contenderResult = {
            //     'socket.id': [
            //         'correct', 'wrong', .....
            //     ]
        }
        let totalPlayers = () => {
            return contender.length
        };
        let counter_answering = 0;
        let counter_nextQuestion = 0;
        let counter_current_questions = 0;
        let question_set_for_checking = redefine_options_set();
        let question_set_for_handlebar = render_questionLoop();
        let resultOBJ = {};

        // io section
        io.on('connection', function (socket) {
            console.log('made socket connection', socket.id);
            contender.push(socket.id)
            // console.log(contender)
            socket.on('disconnect', function () {
                console.log('out socket connection', socket.id);
                let release = contender.indexOf(socket.id)
                contender.splice(release, 1)
                io.emit('user disconnected');
            });
            socket.on('submit answer', function (submitted_answer) {
                counter_nextQuestion = 0;
                counter_answering++;
                // console.log(submitted_answer)
                // result storing 
                if(counter_current_questions === 0){
                    resultOBJ[submitted_answer.name] = [];
                    resultOBJ[submitted_answer.name].push(check_answer(submitted_answer.payload))
                }else{
                    resultOBJ[submitted_answer.name].push(check_answer(submitted_answer.payload))                    
                }
                let dataObj = {
                    PlayersAnswered: counter_answering,
                    TotalPlayers: totalPlayers(),
                    CorrectOrNot: check_answer(submitted_answer.payload)
                };

                // individually
                io.emit('submit answer', dataObj)
                io.to(submitted_answer.name).emit('submit individual answer', dataObj.CorrectOrNot);
                // console.log(counter_answering, counter_current_questions, counter_nextQuestion)

            });
            socket.on('next question button', () => {
                counter_answering = 0;
                // console.log(counter_answering, counter_current_questions, counter_nextQuestion)
                // console.log(counter_answering);
                counter_nextQuestion++;
                let dataObj = {
                    PlayersAnswered: counter_nextQuestion,
                    TotalPlayers: totalPlayers()
                };
                io.emit('next question button', dataObj);
                // console.log(counter_nextQuestion)
                if (counter_nextQuestion == totalPlayers()) {
                    // console.log('working once would be fine')
                    io.to(contender[0]).emit('send new question2', 4567);
                }

                // to result page
                if(counter_current_questions >= questions.length -1){
                    // console.log('the end')
                    // console.log(resultOBJ)
                    io.emit('overall data', resultOBJ)
                    io.emit('to result page')
                }
            });

            socket.on('send new question', (data) => {
                // console.log(question_set_for_handlebar[counter_current_questions])
                // console.log(data);
                if (data == 1234) {
                    // console.log('from index')
                    // console.log(counter_answering, counter_current_questions, counter_nextQuestion)
                } else if (data == 4567) {
                    // console.log('from game page')
                    counter_nextQuestion = 0;
                    counter_current_questions++;
                    io.emit('send new question1', question_set_for_handlebar[counter_current_questions]);
                    // console.log(counter_answering, counter_current_questions, counter_nextQuestion)
                }
            });


            socket.emit('send new question1', question_set_for_handlebar[counter_current_questions]);
        });
    })
}